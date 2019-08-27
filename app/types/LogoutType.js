const {
    GraphQLString,
    GraphQLObjectType,
} = require("graphql");

const LogoutType = new GraphQLObjectType({
    name: "Logout",
    fields: {
        message: { type: GraphQLString },
    }
});
module.exports = LogoutType;