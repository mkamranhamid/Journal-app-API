const {
    GraphQLBoolean,
    GraphQLObjectType,
} = require("graphql");

const UsernameAvailabilityType = new GraphQLObjectType({
    name: "UsernameAvailability",
    fields: {
        availability: { type: GraphQLBoolean },
    }
});
module.exports = UsernameAvailabilityType;