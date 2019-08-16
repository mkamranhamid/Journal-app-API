const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList
} = require("graphql");
const JournalType = require('./JournalType');

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        token: { type: GraphQLString },
        journals: { type: GraphQLList(JournalType) }
    }
});
module.exports = UserType;