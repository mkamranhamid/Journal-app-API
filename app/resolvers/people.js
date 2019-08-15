const PersonModel = require('../models/Person');

exports.Query = {
    all: (root, args, context, info) => {
        return PersonModel.find().exec();
    }
}

exports.Mutation = {
    
}