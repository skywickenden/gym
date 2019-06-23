db.createUser({
  user: "api",
  pwd: "afgsbiahgfasgkbaskdf",
  roles: [
    {
      role: "readWrite",
      db: "api-gym"
    },
    {
      role: "readWrite",
      db: "api-gym-test"
    }
  ]
});