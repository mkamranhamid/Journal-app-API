const PersonModel = require('../models/Person');
const { errorResponse } = require('../util/common');

exports.Query = {
    byId: (root, args, context, info) => {
        console.log(context.isAuth);
        if (!context.isAuth) {
            throw new Error('Unauthenticated user')
        }
        return PersonModel.findById(args.id).exec();
    }
}

exports.Mutation = {
    create: (root, args, context, infor) => {
        const person = new PersonModel(args);
        return person.save();
    }
}