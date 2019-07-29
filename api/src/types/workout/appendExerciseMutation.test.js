const supertest = require("supertest");
const app = require("../../../app");
const ExerciseModel = require("../exercise/model");
const WorkoutModel = require("./model");
const isJSON = require("../../helpers/isJSON");

describe("Test the appendExercise mutation for Workout", () => {

  let exercise1,  workout1;
  beforeEach(async (done) => {
    await ExerciseModel.deleteMany({}, ()  => {});
    exercise1 = await new ExerciseModel(
      { name: "Exercise 1", description: "First test exercise", type: "distance+time" }
    ).save();
    await new ExerciseModel(
      { name: "Exercise 2", description: "Second test exercise" }
    ).save();
    await WorkoutModel.deleteMany({}, ()  => {});
    workout1 = await new WorkoutModel(
      { datetime: "2019-07-27T10:15:00.000Z" }
    ).save();    
    done();
  });

  test("It should perform an appendExercise mutation", async () => {
    await supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            appendWorkoutExercise(
              id: "${workout1.id}", 
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
        expect(Object.keys(body.data)[0]).toBe("appendWorkoutExercise");
        expect(Object.keys(body.data.appendWorkoutExercise)[0]).toBe("id");
        expect(body).toEqual({
          data: {
            appendWorkoutExercise: {
              id: workout1.id,
            }
          }
        });
      });

    return await supertest(app)
      .post("/graphql")
      .send({"query": `
        query {
          Workout(id: "${workout1.id}") {
            id
            datetime
            exercises { 
              exercise { 
                id
                name
              }
              reps {
                weight
                quantity
                distance
                timespan
              }
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
              id: workout1.id,
              datetime: "2019-07-27T10:15:00.000Z",
              exercises: [{
                exercise: {
                  id: exercise1.id,
                  name: "Exercise 1"
                },
                reps: [{
                  distance: 100,
                  quantity: 1,
                  timespan: "00:00:30",
                  weight: 1
                }]
              }]
            }
          }
        });
      });

  });
});