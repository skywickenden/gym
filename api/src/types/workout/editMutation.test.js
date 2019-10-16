const supertest = require("supertest");
const app = require("../../../app");
const isJSON = require("../../helpers/isJSON");
const model = require("./model");

describe("Test the editWorkout mutation", () => {

  let workout1;
  beforeEach(async (done) => {
    await model.deleteMany({}, ()  => {});
    workout1 = await new model(
      { datetime: "2019-07-27T10:15:00.000Z" }
    ).save();
    await new model(
      { datetime: "2019-06-15T10:15:00.000Z" }
    ).save();
    done();
  });

  test("It should perform an editWorkout mutation", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            editWorkout(
              id: "${workout1.id}", 
              datetime: "2019-08-02T10:15:00.000Z", 
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
        expect(body).toEqual({
          data: {
            editWorkout: {
              id: workout1.id,
              datetime: "2019-08-02T10:15:00.000Z", 
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
            editWorkout(
              id: "some_misssing_id", 
              datetime: "2019-08-02T10:15:00.000Z", 
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
        const body = JSON.parse(res.text);
        expect(Object.keys(body)[0]).toBe("errors");
        expect(Object.keys(body.errors[0])[0]).toBe("message");
        expect(body.errors[0].message).toEqual('Cast to ObjectId failed for value "some_misssing_id" at path "_id" for model "workout"');
      });
  });

  test("It should fail an edit if the datetime is invalid", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
        mutation {
          editWorkout(
            id: "${workout1.id}", 
            datetime: "invalid", 
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
        expect(body.errors[0].message).toEqual("Expected type DateTime!, found \"invalid\"; DateTime cannot represent an invalid date-time-string invalid.");
      });
  });

  test("It should fail an edit if the datetime is an empty string", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
        mutation {
          editWorkout(
            id: "${workout1.id}", 
            datetime: "", 
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
        expect(body.errors[0].message).toEqual("Expected type DateTime!, found \"\"; DateTime cannot represent an invalid date-time-string .");
      });
  });

});