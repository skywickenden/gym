const supertest = require("supertest");
const app = require("../../../app");
const FooModel = require("../foo/model");

describe("Test the foos query", () => {

  let foo1, foo2;
  beforeEach(async (done) => {
    await FooModel.deleteMany({}, () => {});
    foo1 = await new FooModel({foobar: "baztest1"}).save();
    foo2 = await new FooModel({foobar: "baztest2"}).save();
    done();
  });

  test("It should fetch the foos", () => {
    return supertest(app)
      .post("/graphql")
      .send({"query": `
        query {
          Foos {
            id
            foobar
          }
        }
      `})
      .expect(200)
      .expect(function (res) {
        expect(JSON.parse(res.text)).toEqual({
          data: {
            Foos: [
              {
                id: foo1.id,
                foobar: "baztest1"
              },
              {
                id: foo2.id,
                foobar: "baztest2"
              }
            ]
          }
        });
      });
  });
});