const supertest = require("supertest");
const app = require("../../../app");
const ExerciseModel = require("../exercise/model");
const WorkoutModel = require("./model");
const isJSON = require("../../helpers/isJSON");

describe("Test the deleteWorkoutExerciseRep mutation", () => {

  let exercise1,  workout1;
  beforeEach(async (done) => {
    await ExerciseModel.deleteMany({}, ()  => {});
    exercise1 = await new ExerciseModel(
      { name: "Exercise 1", description: "First test exercise", type: "distance+time" }
    ).save();
    await WorkoutModel.deleteMany({}, ()  => {});
    workout1 = await new WorkoutModel(
      { datetime: "2019-07-27T10:15:00.000Z" }
    ).save();
    workout1.exercises.push({
      exercise: exercise1.id,
      reps: [{
        distance: 110,
        quantity: 1,
        timespan: "00:00:10",
        weight: 1.1
      }, {
        distance: 120,
        quantity: 2,
        timespan: "00:00:20",
        weight: 2.2
      }, {
        distance: 130,
        quantity: 3,
        timespan: "00:00:30",
        weight: 3.3
      }]
    });
    await workout1.save();
    done();
  });

  test("It should perform a deleteWorkoutRep mutation", async () => {
    await supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            deleteWorkoutRep(
              id: "${workout1.id}" 
              exerciseId: "${exercise1.id}"
              repIndex: 1
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
        expect(Object.keys(body.data)[0]).toBe("deleteWorkoutRep");
        expect(Object.keys(body.data.deleteWorkoutRep)[0]).toBe("id");
        expect(body).toEqual({
          data: {
            deleteWorkoutRep: {
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
                  distance: 110,
                  quantity: 1,
                  timespan: "00:00:10",
                  weight: 1.1
                }, {
                  distance: 130,
                  quantity: 3,
                  timespan: "00:00:30",
                  weight: 3.3
                }]
              }]
            }
          }
        });
      });

  });
});