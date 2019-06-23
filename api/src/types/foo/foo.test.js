const supertest = require("supertest");
const app = require("../../../app");
const isJSON = require("../../helpers/isJSON");

describe('Test the foo mutation and query', () => {
  let newFooId;
  test('It should perform an addFoo mutation', () => {
    return supertest(app)
      .post('/graphql').expect(200)
      .send({
        query: `
          mutation {
            addFoo(foobar: "moreFoo") {
              id
              foobar
            }
          }`
        })
      .expect(200)
      .expect(function (res) {
        expect(isJSON(res.text)).toBe(true);
        const body = JSON.parse(res.text);
        expect(Object.keys(body)[0]).toBe("data");
        expect(Object.keys(body.data)[0]).toBe("addFoo");
        expect(Object.keys(body.data.addFoo)[0]).toBe("id");
        newFooId = body.data.addFoo.id;

        expect(body).toEqual({
          data: {
            addFoo: {
              id: newFooId,
              foobar: "moreFoo"
            }
          }
        });
      })
  });

  test('It should fetch the foo query', () => {
      return supertest(app)
        .post('/graphql').expect(200)
        .send({'query': `
          query {
            foo(id: "${newFooId}") {
              id
              foobar
            }
          }
        `})
        .expect(200)
        .expect(function (res, foo) {
          expect(JSON.parse(res.text)).toEqual({
            data: {
              foo: {
                id: newFooId,
                foobar: "moreFoo"
              }
            }
          });
        })
  });
})

