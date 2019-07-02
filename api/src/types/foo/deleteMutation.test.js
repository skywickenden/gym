const supertest = require("supertest");
const app = require("../../../app");
const isJSON = require("../../helpers/isJSON");
const FooModel = require("../foo/model");

describe("Test the deleteFoo mutation", () => {

  let foo1, foo2;
  beforeEach(async (done) => {
    await FooModel.deleteMany({}, () => {});
    foo1 = await new FooModel({foobar: "baztest1"}).save();
    foo2 = await new FooModel({foobar: "baztest2"}).save();
    done();
  });

  test("It should perform an addFoo mutation", () => {
    return supertest(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            deleteFoo(id: "${foo1.id}") {
              id
            }
          }`
      })
      .expect(200)
      .expect(async (res) => {
        expect(isJSON(res.text)).toBe(true);
        const body = JSON.parse(res.text);
        expect(body).toEqual({
          data: {
            deleteFoo: {
              id: null
            }
          }
        });
        const deletedFoo = await FooModel.findById(foo1.id).exec();
        expect (deletedFoo).toEqual(null);
        const notDeletedFoo = await FooModel.findById(foo2.id).exec();
        expect (notDeletedFoo.foobar).toEqual("baztest2");
      });
  });
});

