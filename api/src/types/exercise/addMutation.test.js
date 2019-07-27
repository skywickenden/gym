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
            addExercise(
              name: "Test Exercise", 
              description: "Test description", 
              type: "distance+time"
            ) {
              id
              name
              description
              type
            }
          }
        `
      })
      .expect(200)
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
              description: "Test description",
              type: "distance+time"
            }
          }
        });
      });
  });

  test("It should error when required name field is an empty string", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            addExercise(
              name: "", 
              description: "Test description", 
              type: "distance+time"
            ) {
              id
              name
              description
              type
            }
          }
        `
      })
      .expect(200)
      .expect((res) => {
        expect(isJSON(res.text)).toBe(true);
        const body = JSON.parse(res.text);
        expect(Object.keys(body)[0]).toBe("errors");
        expect(Object.keys(body.errors[0])[0]).toBe("message");
        expect(body.errors[0].message).toEqual("exercise validation failed: name: Path `name` is required.");
      });
  });  

  test("It should error when required type field is an empty string", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            addExercise(
              name: "Test name", 
              description: "Test description", 
              type: ""
            ) {
              id
              name
              description
              type
            }
          }
        `
      })
      .expect(200)
      .expect((res) => {
        expect(isJSON(res.text)).toBe(true);
        const body = JSON.parse(res.text);
        expect(Object.keys(body)[0]).toBe("errors");
        expect(Object.keys(body.errors[0])[0]).toBe("message");
        expect(body.errors[0].message).toEqual("exercise validation failed: type: Path `type` is required.");
      });      
  });    

  test("It should error when type field is not a valid enum value", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            addExercise(
              name: "Test name", 
              description: "Test description", 
              type: "an+invalid+enum+value"
            ) {
              id
              name
              description
              type
            }
          }
        `
      })
      .expect(200)
      .expect((res) => {
        expect(isJSON(res.text)).toBe(true);
        const body = JSON.parse(res.text);
        expect(Object.keys(body)[0]).toBe("errors");
        expect(Object.keys(body.errors[0])[0]).toBe("message");
        expect(body.errors[0].message).toEqual("exercise validation failed: type: `an+invalid+enum+value` is not a valid enum value for path `type`.");
      });
  });    
});