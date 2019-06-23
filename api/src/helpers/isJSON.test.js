const isJSON = require("./isJSON");

describe('Test the isJSON helper', () => {
  let newFooId;
  test('It should return true if string is JSON', () => {
    // JSON sample taken from https://json.org/example.html
    expect(isJSON(`
    {
      "glossary": {
        "title": "example glossary",
        "GlossDiv": {
          "title": "S",
          "GlossList": {
            "GlossEntry": {
              "ID": "SGML",
              "SortAs": "SGML",
              "GlossTerm": "Standard Generalized Markup Language",
              "Acronym": "SGML",
              "Abbrev": "ISO 8879:1986",
              "GlossDef": {
                "para": "A meta-markup language, used to create markup languages such as DocBook.",
                "GlossSeeAlso": ["GML", "XML"]
              },
              "GlossSee": "markup"
            }
          }
        }
      }
    }`)).toBe(true);
  });

  test('It should return false if string is not JSON', () => {
    // Missing quotes
    expect(isJSON(`{ foo: "bar" }`)).toBe(false);
    // Missing brace
    expect(isJSON(`{ "foo": "bar" `)).toBe(false);
    // Array as root element
    expect(isJSON(`[ "foo", "bat" ]`)).toBe(false);
    // string
    expect(isJSON(`foo`)).toBe(false);
    // number
    expect(isJSON(42)).toBe(false);
    // object
    expect(isJSON({ foo: "bar" })).toBe(false);
  });
})