db.createUser({
  user: "api",
  pwd: "",
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