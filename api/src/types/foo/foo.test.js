const supertest = require("supertest");
const app = require("../../../app");
const FooModel = require("../foo/model");

describe("Test the foo mutation and query", () => {

  let foo;
  beforeEach(async (done) => {
    await FooModel.deleteMany({}, () => {});
    foo = await new FooModel({foobar: "baz"}).save();
    done();
  });

  test("It should fetch the foo query", () => {
    return supertest(app)
      .post("/graphql")
      .send({"query": `
        query {
          Foo(id: "${foo.id}") {
            id
            foobar
          }
        }
      `})
      .expect(200)
      .expect(function (res) {
        expect(JSON.parse(res.text)).toEqual({
          data: {
            Foo: {
              id: foo.id,
              foobar: "baz"
            }
          }
        });
      });
  });
});

