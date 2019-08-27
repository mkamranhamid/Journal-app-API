const {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} = require("graphql");

const PersonType = require('../types/PersonType');
const UserType = require('../types/UserType');
const JournalType = require('../types/JournalType');
const UsernameAvailabilityType = require('../types/UsernameAvailabilityType');

const PeopleResolver = require('../resolvers/people');
const PersonResolver = require('../resolvers/person');
const UserResolver = require('../resolvers/user');
const JournalResolver = require('../resolvers/journal');

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
    },
    journals: {
        type: GraphQLList(JournalType),
        resolve: JournalResolver.Query.all
    },
    journalsById: {
        type: JournalType,
        args: {
            id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: JournalResolver.Query.byId
    },
    usernameAvailability: {
        type: UsernameAvailabilityType,
        args: {
            username: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: UserResolver.Query.usernameAvailability
    }
}
module.exports = query;