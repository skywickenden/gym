const supertest = require("supertest");
const app = require("../../../app");
const model = require("../workout/model");
const isJSON = require("../../helpers/isJSON");

describe("Test the workouts query", () => {
  let workout1, workout2;
  beforeEach(async (done) => {
    await model.deleteMany({}, () => {});
    workout1 = await new model(
      { datetime: "2019-07-26T10:15:00.000Z" }
    ).save();
    workout2 = await new model(
      { datetime: "2019-07-27T10:15:00.000Z" }
    ).save();
    done();
  });

  test("It should fetch the workouts", () => {
    return supertest(app)
      .post("/graphql")
      .send({ query: `
        query {
          Workouts {
            id
            datetime
          }
        }
      `})
      // .expect(200)
      .expect((res) => {
        expect(isJSON(res.text)).toBe(true);
        expect(JSON.parse(res.text)).toEqual({
          data: {
            Workouts: [
              {
                id: workout1.id,
                datetime: "2019-07-26T10:15:00.000Z"
              }, 
              {
                id: workout2.id,
                datetime: "2019-07-27T10:15:00.000Z"
              }
            ]
          }
        });

      });
  });
});