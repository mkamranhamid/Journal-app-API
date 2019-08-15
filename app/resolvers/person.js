const PersonModel = require('../models/Person');

exports.Query = {
    byId: (root, args, context, info) => {
        return PersonModel.findById(args.id).exec();
    }
}

exports.Mutation = {
    create: (root, args, context, infor) => {
        const person = new PersonModel(args);
        return person.save();
    }
}