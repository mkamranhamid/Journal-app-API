const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt
} = require("graphql");
// const UserType = require('./UserType');
const UserModel = require('../models/User');

const JournalType = new GraphQLObjectType({
    name: "Journal",
    fields: {
        id: { type: GraphQLID },
        body: { type: GraphQLString },
        title: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        userId: {
            type: GraphQLID,
            // type: UserType,
            /* resolve: async (parentValue, args) => {
                console.log("parentValue: ", parentValue.userId);
                const user = await UserModel.findOne(parentValue.userId);
                console.log("USER MODEL ::", user);
                return user;
            } */
        }
    }
});
module.exports = JournalType;