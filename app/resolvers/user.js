const UserModel = require('../models/User');

exports.Query = {
    id: (root, args, context, info) => {
        return UserModel.findById(args.id).exec();
    },
    all: (root, args, context, info) => {
        return UserModel.find().exec();
    }
}

exports.Mutation = {
    create: (root, args, context, info) => {
        const user = new UserModel(args);
        user.setPassword(args.password);
        return user.save();
    },
    login: async (root, args, context, info) => {
        const user = UserModel.findOne({ email: args.email });
        const userExec = await user.exec();
        if (!userExec) {
            return;
        }
        const isValidPwd = userExec.validPassword(args.password, userExec.hash, userExec.salt);
        if (isValidPwd) {
            return userExec.toAuthJSON();
        }
        return
    }
}