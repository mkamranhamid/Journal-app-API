const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");
const RootQuery = require('./RootQuery');
const RootMutation = require('./RootMutation');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: RootQuery
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: RootMutation
    })
});

module.exports = schema;