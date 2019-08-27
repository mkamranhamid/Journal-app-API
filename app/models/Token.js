const { Schema, model } = require("mongoose");

const TokenSchema = new Schema({
    token: { type: String, required: true, trim: true },
    status: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true });

const TokenModel = model('token', TokenSchema);

module.exports = TokenModel;