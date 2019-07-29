const supertest = require("supertest");
const app = require("../../../app");
const ExerciseModel = require("../exercise/model");
const WorkoutModel = require("./model");
const isJSON = require("../../helpers/isJSON");

describe("Test the deleteExercise mutation for Workout", () => {

  let exercise1, exercise2, workout;
  beforeEach(async (done) => {
    await ExerciseModel.deleteMany({}, ()  => {});
    exercise1 = await new ExerciseModel(
      { name: "Exercise 1", description: "First test exercise", type: "distance+time" }
    ).save();
    exercise2 = await new ExerciseModel(
      { name: "Exercise 2", description: "Second test exercise" }
    ).save();
    await WorkoutModel.deleteMany({}, ()  => {});
    workout = await new WorkoutModel(
      { datetime: "2019-07-27T10:15:00.000Z" }
    ).save();    
    workout.exercises.push({exercise: exercise1.id});
    workout.exercises.push({exercise: exercise2.id});
    await workout.save();
    done();
  });

  test("It should perform a deleteExercise mutation", async () => {
    await supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            deleteWorkoutExercise(
              id: "${workout.id}", 
              exerciseId: "${exercise1.id}"
            ) {
              id
            }
          }
        `
      })
      .expect(200)
      .expect((res) => {
        expect(isJSON(res.text)).toBe(true);
        const body = JSON .parse(res.text);
        expect(Object.keys(body)[0]).toBe("data");
        expect(Object.keys(body.data)[0]).toBe("deleteWorkoutExercise");
        expect(Object.keys(body.data.deleteWorkoutExercise)[0]).toBe("id");
        expect(body).toEqual({
          data: {
            deleteWorkoutExercise: {
              id: workout.id,
            }
          }
        });
      });

    return await supertest(app)
      .post("/graphql")
      .send({"query": `
        query {
          Workout(id: "${workout.id}") {
            id
            datetime
            exercises { 
              exercise { id name }
            }
          }
        }
      `})
      .expect(200)
      .expect((res) => {
        expect(isJSON(res.text)).toBe(true);
        expect(JSON.parse(res.text)).toEqual({
          data: {
            Workout: {
              id: workout.id,
              datetime: "2019-07-27T10:15:00.000Z",
              exercises: [{
                exercise: {
                  id: exercise2.id,
                  name: "Exercise 2"
                }
              }]
            }
          }
        });
      });

  });
});