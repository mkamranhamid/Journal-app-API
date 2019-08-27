const UserModel = require('../models/User');
const TokenModel = require('../models/Token');

exports.Query = {
    id: (root, args, context, info) => {
        return UserModel.findById(args.id).populate('journals').exec();
    },
    all: (root, args, context, info) => {
        return UserModel.find().populate('journals').exec();
    },
    usernameAvailability: async (root, args, context, info) => {
        const user = await UserModel.findOne({ username: args.username }).exec();
        if (!user) {
            return { availability: true };
        }
        return { availability: false }
    },
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
        try {
            const user = await UserModel.findOne({ email: args.email }).populate('journals');
            if (!user) {
                throw new Error('Email or Password not correct');
            }
            const token = await TokenModel.findOne({ userId: user.id, status: 'active' });
            if (token) {
                token.status = 'inactive';
                token.save();
            }
            const isValidPwd = user.validPassword(args.password, user.hash, user.salt);
            if (!isValidPwd) {
                throw new Error('Email or Password not correct');
            }
            return user.toAuthJSON();
        } catch (err) {
            var errMessage = err.message || 'Some error occured while performing login operation';
            throw new Error(errMessage);
        }

    },
    logout: async (root, args, context, info) => {
        try {
            const token = await TokenModel.findOne({ userId: context.uid, status: 'active' });
            if (token) {
                token.status = 'inactive';
                token.save();
            }
            return { message: "user has been logged out" };
        } catch (err) {
            var errMessage = err.message || 'Some error occured while performing logout operation';
            throw new Error(errMessage);
        }

    },
}