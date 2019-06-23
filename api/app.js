const express = require("express");
const mongoose = require("mongoose");
const expressGraphQl = require("express-graphql");
const cors = require("cors");
const Schema = require("./src/schema");

const env = process.env;
const mongo = {
  username: env.MONGO_USERNAME,
  password: env.MONGO_PASSWORD,
  database: env.MONGO_database,
  port: env.MONGO_PORT,
  service: env.MONGO_SERVICE
};


const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

if (env.NODE_ENV === "test") {
  mongoose.connect(
    `mongodb://${mongo.username}:${mongo.password}@${mongo.service}:${mongo.port}/${mongo.database}-test?authSource=${mongo.database}`,
    { useNewUrlParser: true }
  );

  // delete any stale test data
  const testMiddleware = (req, res, next) => {
    Object.keys(mongoose.connection.models).forEach((collection) => {
      mongoose.connection.models[collection].remove({});
    });
    next();
  }
  app.use(testMiddleware);

} else {
  mongoose.connect(
    `mongodb://${mongo.username}:${mongo.password}@${mongo.service}:${mongo.port}/${mongo.database}`,
    { useNewUrlParser: true }
  );
}

if (process.env.NODE_ENV !== "production") app.use(cors());

app.use("/graphql", expressGraphQl({
  schema: Schema,
  graphiql: true
}));

module.exports = app;