const supertest = require("supertest");
const app = require("../../../app");
const isJSON = require("../../helpers/isJSON");
const model = require("./model");

describe("Test the delete exercise mutation", () => {

  let exercise1, exercise2;
  beforeEach(async (done) => {
    await model.deleteMany({}, ()  => {});
    exercise1 = await new model(
      { name: "Exercise 1", description: "First test exercise" }
    ).save();
    exercise2 = await new model(
      { name: "Exercise 2", description: "Second test exercise" }
    ).save();
    done();
  });

  test("It should perform the delete exercise mutation", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            deleteExercise(id: "${exercise1.id}") {
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
            deleteExercise: {
              id: null
            }
          }
        });
        const deletedExercise = await model.findById(exercise1.id).exec();
        expect(deletedExercise).toEqual(null);
        const notDeletedExercise = await model.findById(exercise2.id).exec();
        expect(notDeletedExercise.name).toEqual("Exercise 2");
      });
  });
});
