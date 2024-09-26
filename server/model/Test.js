const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    testName: {
        type: String,
        trim: true,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    studentsEnrolled : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    ],
});

module.exports = mongoose.model("Test", testSchema);