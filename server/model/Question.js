const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    testId: {
        type: String,
        ref: mongoose.Schema.Types.ObjectId,
    },
    question: {
        type: String,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    options: [
        {
            type: String,
        }
    ]
});

module.exports = mongoose.model("Question", questionSchema);