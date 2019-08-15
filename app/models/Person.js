const mongoose = require("mongoose");

const PersonModel = mongoose.model("person", {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true }
});

module.exports = PersonModel;