const supertest = require("supertest");
const app = require("../../../app");
const ExerciseModel = require("../exercise/model");
const WorkoutModel = require("./model");
const isJSON = require("../../helpers/isJSON");

describe("Test the appendRep mutation for an Exercise in a Workout", () => {

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
        distance: 100,
        quantity: 1,
        timespan: "00:00:30",
        weight: 1
      }]
    });
    await workout1.save();
    done();
  });

  test("It should perform an appendWorkoutExerciseRep mutation", async () => {
    await supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            appendWorkoutExerciseRep(
              id: "${workout1.id}", 
              exerciseId: "${exercise1.id}"
              weight: 5.5,
              quantity: 8,
              distance: 10.6,
              timespan: "02:35:12"
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
        expect(Object.keys(body.data)[0]).toBe("appendWorkoutExerciseRep");
        expect(Object.keys(body.data.appendWorkoutExerciseRep)[0]).toBe("id");
        expect(body).toEqual({
          data: {
            appendWorkoutExerciseRep: {
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
                }, {
                  distance: 10.6,
                  quantity: 8,
                  timespan: "02:35:12",
                  weight: 5.5
                }]
              }]
            }
          }
        });
      });

  });

  test("It should error when an appendWorkoutExerciseRep mutation has an invalid weight", async () => {
    await supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            appendWorkoutExerciseRep(
              id: "${workout1.id}", 
              exerciseId: "${exercise1.id}"
              weight: "invalid weight",
              quantity: 8,
              distance: 10.6,
              timespan: "02:35:12"
            ) {
              id
            }
          }
        `
      })
      .expect(400)
      .expect((res) => {
        expect(isJSON(res.text)).toBe(true);
        const body = JSON .parse(res.text);
        expect(Object.keys(body)[0]).toBe("errors");
        expect(Object.keys(body.errors[0])[0]).toBe("message");
        expect(body.errors[0].message).toEqual('Expected type Float, found "invalid weight".');
      });
  });
  
  test("It should error when an appendWorkoutExerciseRep mutation has an invalid quantity", async () => {
    await supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            appendWorkoutExerciseRep(
              id: "${workout1.id}", 
              exerciseId: "${exercise1.id}"
              weight: 5.5,
              quantity: 8.5,
              distance: 10.6,
              timespan: "02:35:12"
            ) {
              id
            }
          }
        `
      })
      .expect(400)
      .expect((res) => {
        expect(isJSON(res.text)).toBe(true);
        const body = JSON .parse(res.text);
        expect(Object.keys(body)[0]).toBe("errors");
        expect(Object.keys(body.errors[0])[0]).toBe("message");
        expect(body.errors[0].message).toEqual("Expected type Int, found 8.5.");
      });
  });
  

  test("It should error when an appendWorkoutExerciseRep mutation has an invalid weight", async () => {
    await supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            appendWorkoutExerciseRep(
              id: "${workout1.id}", 
              exerciseId: "${exercise1.id}"
              weight: "invalid weight",
              quantity: 8,
              distance: 10.6,
              timespan: "02:35:12"
            ) {
              id
            }
          }
        `
      })
      .expect(400)
      .expect((res) => {
        expect(isJSON(res.text)).toBe(true);
        const body = JSON .parse(res.text);
        expect(Object.keys(body)[0]).toBe("errors");
        expect(Object.keys(body.errors[0])[0]).toBe("message");
        expect(body.errors[0].message).toEqual('Expected type Float, found "invalid weight".');
      });
  });
  
  test("It should error when an appendWorkoutExerciseRep mutation has an invalid distance", async () => {
    await supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            appendWorkoutExerciseRep(
              id: "${workout1.id}", 
              exerciseId: "${exercise1.id}"
              weight: 5.5,
              quantity: 8,
              distance: "invalid distance",
              timespan: "02:35:12"
            ) {
              id
            }
          }
        `
      })
      .expect(400)
      .expect((res) => {
        expect(isJSON(res.text)).toBe(true);
        const body = JSON .parse(res.text);
        expect(Object.keys(body)[0]).toBe("errors");
        expect(Object.keys(body.errors[0])[0]).toBe("message");
        expect(body.errors[0].message).toEqual('Expected type Float, found "invalid distance".');
      });
  });
});