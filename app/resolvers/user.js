const UserModel = require('../models/User');

exports.Query = {
    id: (root, args, context, info) => {
        return UserModel.findById(args.id).populate('journals').exec();
    },
    all: (root, args, context, info) => {
        return UserModel.find().populate('journals').exec();
    }
}

exports.Mutation = {
    create: async (root, args, context, info) => {
        const emailExist = await UserModel.findOne({ email: args.email }).exec();
        if (emailExist && emailExist.email) {
            return new Error('Email already exist');
        }
        const user = new UserModel(args);
        user.setPassword(args.password);
        return user.save();
    },
    login: async (root, args, context, info) => {
        const user = UserModel.findOne({ email: args.email }).populate('journals');
        const userExec = await user.exec();
        if (!userExec) {
            throw new Error('Email or Password not correct');
        }
        const isValidPwd = userExec.validPassword(args.password, userExec.hash, userExec.salt);
        if (!isValidPwd) {
            throw new Error('Email or Password not correct');
        }
        return userExec.toAuthJSON();
    }
}