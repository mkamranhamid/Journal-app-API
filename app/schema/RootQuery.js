const {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");

const PersonType = require('../types/PersonType');
const PeopleResolver = require('../resolvers/people');
const PersonResolver = require('../resolvers/person');

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
    }
}
module.exports = query;