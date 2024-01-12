const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageScheme = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" , required: true },
    title: { type: String, required: true, maxLength: 100},
    text: { type: String, required: true, maxLength: 280},
    timestamp: { type: Date },
});

module.exports = mongoose.model("Message", MessageScheme);