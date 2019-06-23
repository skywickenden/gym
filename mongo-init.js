db.createUser({
  user: "api",
  pwd: "afgsbiahgfasgkbaskdf",
  roles: [
    {
      role: "readWrite",
      db: "api-graphql"
    },
    {
      role: "readWrite",
      db: "api-graphql-test"
    }
  ]
});