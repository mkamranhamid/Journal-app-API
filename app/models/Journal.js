const mongoose = require("mongoose");

const JournalSchema = new Schema({
    body: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'user' }
}, { timestamps: true });

const JournalModel = model('journal', JournalSchema);

module.exports = JournalModel;