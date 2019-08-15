const {
    GraphQLString,
    GraphQLNonNull,
} = require("graphql");

const PersonType = require('../types/PersonType');
const UserType = require('../types/UserType');
const PersonResolver = require('../resolvers/person');
const UserResolver = require('../resolvers/user');

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
    }
}
module.exports = mutation;