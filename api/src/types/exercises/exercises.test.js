const supertest = require("supertest");
const app = require("../../../app");
const model = require("../exercise/model");
const isJSON = require("../../helpers/isJSON");

describe("Test the exercises query", () => {
  let exercise1, exercise2;
  beforeEach(async (done) => {
    await model.deleteMany({}, () => {});
    exercise1 = await new model(
      {name: "Exercise 1", description: "Test exercise 1"}
    ).save();
    exercise2 = await new model(
      {name: "Exercise 2", description: "Test exercise 2"}
    ).save();
    done();
  });

  test("It should fetch the exercises", () => {
    return supertest(app)
      .post("/graphql")
      .send({ query: `
        query {
          Exercises {
            id
            name
            description
          }
        }
      `})
      .expect(200)
      .expect((res) => {
        expect(isJSON(res.text)).toBe(true);
        expect(JSON.parse(res.text)).toEqual({
          data: {
            Exercises: [
              {
                id: exercise1.id,
                name: "Exercise 1",
                description: "Test exercise 1"
              }, 
              {
                id: exercise2.id,
                name: "Exercise 2",
                description: "Test exercise 2"
              }
            ]
          }
        });

      });
  });
});