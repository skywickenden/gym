const supertest = require("supertest");
const app = require("../../../app");
const isJSON = require("../../helpers/isJSON");
const model = require("./model");

describe("Test the editExercise mutation", () => {

  let exercise1;
  beforeEach(async (done) => {
    await model.deleteMany({}, ()  => {});
    exercise1 = await new model(
      { name: "Exercise 1", description: "First test exercise" }
    ).save();
    await new model(
      { name: "Exercise 2", description: "Second test exercise" }
    ).save();
    done();
  });

  test("It should perform an editExercise mutation", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            editExercise(
              id: "${exercise1.id}", 
              name: "Updated Test Exercise", 
              description: "Updated test description"
            ) {
              id
              name
              description
            }
          }
        `
      })
      // .expect(200)
      .expect((res) => {
        expect(isJSON(res.text)).toBe(true);
        const body = JSON .parse(res.text);
        expect(body).toEqual({
          data: {
            editExercise: {
              id: exercise1.id,
              name: "Updated Test Exercise", 
              description: "Updated test description"
            }
          }
        });
      });
  });
});