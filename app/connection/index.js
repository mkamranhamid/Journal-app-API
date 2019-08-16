//Import the mongoose module
const mongoose = require('mongoose');


/**
 * Connect to MongoDB.
 */
exports.dbconnection = () => {
    const mongoDB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SRV}/${process.env.MONGO_DB_NAME}?retryWrites=true`;
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.connect(mongoDB)
        .then(() => {
            console.log('connection succesful');
        })
        .catch((err) => {
            console.error(err);
            console.log('MongoDB connection error. Please make sure MongoDB is running.');
            process.exit();
        });
}