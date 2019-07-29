const supertest = require("supertest");
const app = require("../../../app");
const WorkoutModel = require("./model");
const ExerciseModel = require("../exercise/model");
const isJSON = require("../../helpers/isJSON");

describe("Test the Workout query", () => {

  let exercise1, workout;
  beforeEach(async (done) => {
    await ExerciseModel.deleteMany({}, ()  => {});
    exercise1 = await new ExerciseModel(
      { name: "Exercise 1", description: "First test exercise", type: "distance+time" }
    ).save();
    await new ExerciseModel(
      { name: "Exercise 2", description: "Second test exercise" }
    ).save();
    await WorkoutModel.deleteMany({}, ()  => {});
    workout = await new WorkoutModel(
      { datetime: "2019-07-27T10:15:00.000Z" }
    ).save();    
    workout.exercises.push({exercise: exercise1.id, weight: 5});
    await workout.save();
    done();
  });


  test("It should fetch the Workout query", () => {
    return supertest(app)
      .post("/graphql")
      .send({"query": `
        query {
          Workout(id: "${workout.id}") {
            id
            datetime
            exercises { 
              exercise {id, name }
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
                  id: exercise1.id,
                  name: "Exercise 1"
                }
              }]
            }
          }
        });
      });
  });
});