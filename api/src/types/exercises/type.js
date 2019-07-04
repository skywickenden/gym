const { GraphQLList } = require("graphql");
const ExerciseType = require("../exercise/type");

module.exports = new GraphQLList(ExerciseType);