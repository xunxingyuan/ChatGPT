const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        queryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Query",
        },
    },
    { timestamps: true }
);

module.exports = new mongoose.model("chat", chatSchema);
