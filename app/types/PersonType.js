const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

const PersonType = new GraphQLObjectType({
    name: "Person",
    fields: {
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString }
    }
});
module.exports = PersonType;