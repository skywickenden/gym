const supertest = require("supertest");
const app = require("../../../app");
const isJSON = require("../../helpers/isJSON");

describe("Test the addExercise mutation", () => {
  test("It should perform an addExercise mutation", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            addExercise(name: "Test Exercise", description: "Test description") {
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
        expect(Object.keys(body)[0]).toBe("data");
        expect(Object.keys(body.data)[0]).toBe("addExercise");
        expect(Object.keys(body.data.addExercise)[0]).toBe("id");
        const newExerciseId = body.data.addExercise.id;

        expect(body).toEqual({
          data: {
            addExercise: {
              id: newExerciseId,
              name: "Test Exercise",
              description: "Test description"
            }
          }
        });
      });
  });
});