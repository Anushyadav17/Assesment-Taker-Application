const User = require("../model/User");
const Question = require("../model/Question");
const Test = require("../model/Test");

exports.getAllCount = async (req, res) => {
    try {
        const { userId } = req.body; // Extract userId from request body

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "UserId not Found"
            });
        }

        const userCount = await User.countDocuments();
        const testCount = await Test.countDocuments();
        const questionCount = await Question.countDocuments();

        const userDetails = await User.findById(userId); // Pass userId directly to findById
        const userTestCount = userDetails.tests.length;

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Statics find successfully",
            userCount,
            testCount,
            questionCount,
            userTestCount // Optionally return userDetails if needed
        });

    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });
    }
};
