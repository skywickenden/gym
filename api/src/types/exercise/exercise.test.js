const supertest = require("supertest");
const app = require("../../../app");
const ExerciseModel = require("./model");
const isJSON = require("../../helpers/isJSON");

describe("Test the Exercise query", () => {
  let exercise;
  beforeEach(async(done) => {
    await ExerciseModel.deleteMany({}, () => {});
    exercise = await new ExerciseModel({ 
      name: "Test Exercise",
      description: "Test Description"
    }).save();
    done();
  });


  test("It should fetch the Exercise query", () => {
    return supertest(app)
      .post("/graphql")
      .send({"query": `
        query {
          Exercise(id: "${exercise.id}") {
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
            Exercise: {
              id: exercise.id,
              name: "Test Exercise",
              description: "Test Description"
            }
          }
        });
      });
  });
});