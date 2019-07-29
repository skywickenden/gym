const supertest = require("supertest");
const app = require("../../../app");
const WorkoutModel = require("./model");
const isJSON = require("../../helpers/isJSON");

describe("Test the addWorkout mutation", () => {

  beforeEach(async (done) => {
    await WorkoutModel.deleteMany({}, ()  => {});
    done();
  });

  test("It should perform an addWorkout mutation", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            addWorkout(
              datetime: "2019-07-27T10:15:30.000Z",
            ) {
              id
              datetime
            }
          }
        `
      })
      .expect(200)
      .expect((res) => {
        expect(isJSON(res.text)).toBe(true);
        const body = JSON .parse(res.text);
        expect(Object.keys(body)[0]).toBe("data");
        expect(Object.keys(body.data)[0]).toBe("addWorkout");
        expect(Object.keys(body.data.addWorkout)[0]).toBe("id");
        const newWorkoutId = body.data.addWorkout.id;
        expect(body).toEqual({
          data: {
            addWorkout: {
              id: newWorkoutId,
              datetime: "2019-07-27T10:15:30.000Z"
            }
          }
        });
      });
  });

  test("It should error when datetime is invalid", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            addWorkout(
              datetime: "an invalid date",
            ) {
              id
              datetime
            }
          }
        `
      })
      .expect(400)
      .expect((res) => {
        expect(isJSON(res.text)).toBe(true);
        const body = JSON.parse(res.text);
        expect(Object.keys(body)[0]).toBe("errors");
        expect(Object.keys(body.errors[0])[0]).toBe("message");
        expect(body.errors[0].message).toEqual('Expected type DateTime!, found "an invalid date"; DateTime cannot represent an invalid date-time-string an invalid date.');
      });      
      
  });  
});

