const {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");

const PersonType = require('../types/PersonType');
const UserType = require('../types/UserType');
const PeopleResolver = require('../resolvers/people');
const PersonResolver = require('../resolvers/person');
const UserResolver = require('../resolvers/user');

const query = {
    people: {
        type: GraphQLList(PersonType),
        resolve: PeopleResolver.Query.all
    },
    person: {
        type: PersonType,
        args: {
            id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: PersonResolver.Query.byId
    },
    users: {
        type: GraphQLList(UserType),
        resolve: UserResolver.Query.all
    }
}
module.exports = query;