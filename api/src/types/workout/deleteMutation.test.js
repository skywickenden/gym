const supertest = require("supertest");
const app = require("../../../app");
const isJSON = require("../../helpers/isJSON");
const model = require("./model");

describe("Test the delete workout mutation", () => {

  let workout1, workout2;
  beforeEach(async (done) => {
    await model.deleteMany({}, ()  => {});
    workout1 = await new model(
      { datetime: "2019-07-27T10:15:00.000Z" }
    ).save();
    workout2 = await new model(
      { datetime: "2019-07-28T11:45:00.000Z" }
    ).save();
    done();
  });

  test("It should perform the delete workout mutation", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            deleteWorkout(id: "${workout1.id}") {
              id
            }
          }
        `
      })
      .expect(200)
      .expect(async (res) => {
        expect(isJSON(res.text)).toBe(true);
        const body = JSON.parse(res.text);
        expect(body).toEqual({
          data: {
            deleteWorkout: {
              id: null
            }
          }
        });
        const deletedWorkout = await model.findById(workout1.id).exec();
        expect(deletedWorkout).toEqual(null);
        const notDeletedWorkout = await model.findById(workout2.id).exec();
        expect(notDeletedWorkout.datetime).toEqual(new Date("2019-07-28T11:45:00.000Z"));
      });
  });
});
