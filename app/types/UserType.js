const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        token: { type: GraphQLString },
    }
});
module.exports = UserType;