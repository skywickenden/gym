db.createUser({
  user: "api",
  pwd: "",
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