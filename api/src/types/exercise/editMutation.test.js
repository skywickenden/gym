const supertest = require("supertest");
const app = require("../../../app");
const isJSON = require("../../helpers/isJSON");
const model = require("./model");

describe("Test the editExercise mutation", () => {

  let exercise1;
  beforeEach(async (done) => {
    await model.deleteMany({}, ()  => {});
    exercise1 = await new model(
      { name: "Exercise 1", description: "First test exercise", type: "distance+time" }
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
              description: "Updated test description",
              type: "weight+reps"
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
        expect(body).toEqual({
          data: {
            editExercise: {
              id: exercise1.id,
              name: "Updated Test Exercise", 
              description: "Updated test description",
              type: "weight+reps"
            }
          }
        });
      });
  });

  test("It should fail an edit if the id does not exist", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            editExercise(
              id: "some_misssing_id", 
              name: "Updated Test Exercise", 
              description: "Updated test description",
              type: "weight+reps"
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
        expect(body.errors[0].message).toEqual('Cast to ObjectId failed for value "some_misssing_id" at path "_id" for model "exercise"');
      });
  });

  test("It should fail an edit if the name is an empty string", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            editExercise(
              id: "${exercise1.id}",
              name: "", 
              description: "Updated test description",
              type: "weight+reps"
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
        expect(body.errors[0].message).toEqual("Validation failed: name: Path `name` is required.");
      });
  });

  test("It should fail an edit if the type is an empty string", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            editExercise(
              id: "${exercise1.id}",
              name: "Updated Test Exercise", 
              description: "Updated test description",
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
        expect(body.errors[0].message).toEqual("Validation failed: type: Path `type` is required.");
      });
  });

  test("It should error when type field is not a valid enum value", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            editExercise(
              id: "${exercise1.id}",
              name: "Updated Test Exercise", 
              description: "Updated test description",
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
        expect(body.errors[0].message).toEqual("Validation failed: type: `an+invalid+enum+value` is not a valid enum value for path `type`.");
      });
  });
});