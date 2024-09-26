const Test = require("../model/Test");

exports.createTest = async(req,res) => {
    try {
        const {testName, title, duration} = req.body;

        if(!testName || !title || !duration) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }

        const test = await Test.create({
            testName, 
            title,
            duration,
        });

        return res.status(200).json({
            success: true,
            message: "Test created successfully"
        })

    } catch(error) {
        console.log("error while creating test");

        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

exports.getAllTest = async(req,res) => {
    try {
        const AllTest = await Test.find({});

        return res.status(200).json({
            success : true,
            message : 'Test get successfully',
            data : AllTest,
        });
    }
    catch(error) {
        return res.status(500).json({
            success : false,
            message : error.message,
        });
    }
}

exports.getTestDetails = async(req,res) => {
    try { 
        const {testId} = req.body;

        if(!testId) {
            return res.status(404).json({
                success: false,
                message: "Test not found...",
            })
        }

        const testDetails = await Test.findById({_id:testId})

        if(!testDetails) {
            return res.status(404).json({
                success : false,
                message : `Could not find the test with ${testId}`,
            })
        }

        return res.status(404).json({
            success: true,
            message: "Test found successfully",
            data : testDetails,
        })
    } catch(error) {
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}