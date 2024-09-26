const User = require("../model/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//signup
exports.signUp = async(req,res) => {
    try{
        const {accountType, firstName, lastName, email, password, confirmPassword} = req.body;

        if(!accountType || !firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }

        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent)
        {
            return res.status(401).json({
                success : false,
                message : "User Already Exist",
            })
        }

        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password and confirm password do not matched",
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password : hashPassword,
        });

        return res.status(200).json({
            success: true,
            message: "User signup Successfully...",
        })
    }
    catch(error)
    {
        console.log("error while signup...");

        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

//login
exports.login = async(req,res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password)
        {
            return res.status(401).json({
                success : false,
                message : "All fields are required",
            });
        }

        const user = await User.findOne({email});

        if(!user)
        {
            return res.status(401).json({
                success : false,
                message : "User not found please signup first",
            });
        }

        if(await bcrypt.compare(password,user.password)) {
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn : "2h",
            });

            user.token = token;

            //create cookies
            const options = {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : true,
            }
            res.cookie("token", token, options).status(200).json({
                success : true,
                token,
                user,
                message : 'Log in Successfully',
            })
        }
        else
        {
            return res.status(401).json({
                success : false,
                message : "Password doesnot matched",
            });
        }
    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : 'Error while login',
        });
    }
}