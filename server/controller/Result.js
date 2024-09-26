const User = require("../model/User");
const Result = require("../model/Result");

exports.createResult = async (req, res) => {
  try {
    const { userId, testId, score, userAnswer } = req.body;

    if (!userId || !testId || !userAnswer) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create the result
    const createResult = await Result.create({
      userId,
      testId,
      score,
      userAnswer,
    });

    // Find and update the user
    const userDetails = await User.findById(userId);

    // Check if testId is in user tests array or not
    if (!userDetails.tests.includes(testId)) {
      // If not, add it to the tests array
      userDetails.tests.push(testId);
    }

    // Add the result to the user's results array
    userDetails.results.push(createResult._id);

    // Save the updated user document
    await userDetails.save();

    return res.status(200).json({
      success: true,
      message: 'Result Created Successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getResult = async (req,res) => {
    try {
        const {userId} = req.body;

        if( !userId ) {
            return res.status(404).json({
                success : false,
                message : "all feilds are required"
            })
        }

        const resultDetails = await Result.find({ userId : userId}); 
       

        if( !resultDetails ) {
            return res.status(404).json({
                success : false,
                message : "all feilds are required"
            })
        }        
        
        return res.status(200).json({
            success : true,
            message : "Result retrived",
            data : resultDetails
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    } 
}