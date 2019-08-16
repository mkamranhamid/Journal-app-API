const JournalModel = require('../models/Journal');
const UserModel = require('../models/User');

exports.Query = {
    byId: (root, args, context, info) => {
        if (!context.isAuth) {
            throw new Error('Unauthenticated user');
        }
        return JournalModel.findById(args.id).exec();
    },
    all: (root, args, context, info) => {
        if (!context.isAuth) {
            throw new Error('Unauthenticated user')
        }
        return JournalModel.find().exec();
    }
}

exports.Mutation = {
    create: async (root, args, context, info) => {
        try {
            if (!context.isAuth) {
                throw new Error('Unauthenticated user');
            }
            args.userId = context.uid;

            const journal = new JournalModel(args);
            const savedJournal = await journal.save();
            const user = await UserModel.findById(args.userId);
            user.journals.push(savedJournal);
            return user.save();
        } catch (err) {
            console.log('Journal create Mutation: ', err);
            throw new Error('Some error occured while adding journal');
        }
    },
    delete: async (root, args, context, info) => {
        if (!context.isAuth) {
            throw new Error('Unauthenticated user');
        }
        const journal = await JournalModel.findById(args.id).exec();
        if (!journal) {
            throw new Error('No journal found with the id');
        }
        const deletedJournal = await JournalModel.deleteOne({ _id: args.id });
        return journal;
    },
    update: async (root, args, context, info) => {
        if (!context.isAuth) {
            throw new Error('Unauthenticated user');
        }
        const journal = await JournalModel.findById(args.id).exec();
        if (!journal) {
            throw new Error('No journal found with the id');
        }
        journal.body = args.body || "";
        journal.title = args.title || "";
        return journal.save();
    },
}