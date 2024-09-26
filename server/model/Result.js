const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true // Assuming userId is required
    },
    testId: {
        type: String,
        required: true // Assuming testId is required
    },
    score: {
        type: Number,
        required: true // Assuming score is required
    },
    createdAt: {
        type: Date,
        default: Date.now // Default value for createdAt field
    },
    userAnswer: [
        {
            type: Object // Array of objects for userAnswer
        }
    ]
});

module.exports = mongoose.model("Result", resultSchema);
