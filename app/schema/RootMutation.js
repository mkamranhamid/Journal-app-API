const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} = require("graphql");

const PersonType = require('../types/PersonType');
const UserType = require('../types/UserType');
const JournalType = require('../types/JournalType');
const PersonResolver = require('../resolvers/person');
const UserResolver = require('../resolvers/user');
const JournalResolver = require('../resolvers/journal');

const mutation = {
    person: {
        type: PersonType,
        args: {
            firstname: { type: GraphQLNonNull(GraphQLString) },
            lastname: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: PersonResolver.Mutation.create
    },
    register: {
        type: UserType,
        args: {
            firstname: { type: GraphQLNonNull(GraphQLString) },
            lastname: { type: GraphQLNonNull(GraphQLString) },
            email: { type: GraphQLNonNull(GraphQLString) },
            password: { type: GraphQLNonNull(GraphQLString) },
            username: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: UserResolver.Mutation.create
    },
    login: {
        type: UserType,
        args: {
            email: { type: GraphQLNonNull(GraphQLString) },
            password: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: UserResolver.Mutation.login
    },
    journalCreate: {
        type: UserType,
        args: {
            body: { type: GraphQLNonNull(GraphQLString) },
            title: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: JournalResolver.Mutation.create
    },
    journalDelete: {
        type: JournalType,
        args: {
            id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: JournalResolver.Mutation.delete
    },
    journalUpdate: {
        type: JournalType,
        args: {
            id: { type: GraphQLNonNull(GraphQLID) },
            body: { type: GraphQLString },
            title: { type: GraphQLString }
        },
        resolve: JournalResolver.Mutation.update
    }
}
module.exports = mutation;