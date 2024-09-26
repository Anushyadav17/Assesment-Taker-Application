const Question = require("../model/Question");

exports.createQuestion = async (req, res) => {
    try {
        const questions = req.body;

        // Validate each question in the array
        for (const question of questions) {
            if (!question.question || !question.category || !question.testId || !question.options || !question.correctAnswer) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required for each question",
                });
            }

        }

        const createdQuestions = await Question.insertMany(questions);

        return res.status(200).json({
            success: true,
            message: "Questions created successfully",
            data: createdQuestions
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getQuestions = async (req, res) => {
    try {
        const { testId } = req.body;

        if (!testId) {
            return res.status(400).json({
                success: false,
                message: "Test ID is required",
            });
        }

        const allQuestions = await Question.find({ testId: testId });

        return res.status(200).json({
            success: true,
            message: 'Questions retrieved successfully',
            data: allQuestions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
