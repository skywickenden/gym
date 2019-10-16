const { GraphQLList } = require("graphql");
const WorkoutType = require("../workout/type");

module.exports = new GraphQLList(WorkoutType);