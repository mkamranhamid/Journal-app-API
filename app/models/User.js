const { Schema, model } = require("mongoose");
const { pbkdf2Sync, randomBytes } = require('crypto');
var { sign } = require('jsonwebtoken');

const UserSchema = new Schema({
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    journals : [{ type: Schema.Types.ObjectId, ref: 'journal' }]
}, { timestamps: true });

UserSchema.methods.validPassword = (password, hash, salt) => {
    let pwdHash = pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    return hash === pwdHash;
};
UserSchema.methods.setPassword = function (password) {
    this.salt = randomBytes(16).toString('hex');
    this.hash = pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};
UserSchema.methods.generateJWT = function () {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    const token = sign({
        id: this.id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, process.env.JWT_SECRET);
    return token;
};
UserSchema.methods.toAuthJSON = function () {
    return {
        id: this.id,
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
    };
};

const UserModel = model('user', UserSchema);

module.exports = UserModel;