const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const randomString = require("randomstring");

const signupUser = asyncHandler(async (req, res) => {
    try {
        const { password, confirmPassword, phoneNumber, email } = req.body;

        const emailExist = await User.findOne({ email, isVerified: true });
        if (emailExist) return res.status(400).json({
            message: "The user with this email address already exist"
        }).end();

        if (password !== confirmPassword)
            return res.status(400).json({
                message: "Password and confirm password didn't match"
            }).end();

        const checkUser = await User.findOne({ phoneNumber });

        req.body.password = await bcrypt.hash(password, 12);
        req.body.verificationOtp = randomString.generate({ length: 4, charset: "numeric" });

        if (checkUser && !checkUser.isVerified) {
            const updatedUser = { $set: req.body };
            if (!email) updatedUser.$unset = { email: 1 };

            await User.updateOne(
                { _id: checkUser._id },
                updatedUser,
                { runValidators: true }
            );
        } else {
            const user = new User(req.body);
            await user.save();
        }

        res.status(201).json({
            message: "Enter the OTP sent on your phone to verify account"
        });
    }
    catch (e) {
        if (e.code === 11000)
            res.status(409).json({
                message: `Another user with the phone number (${e.keyValue.phoneNumber}) already exist`
            });
        else res.status(400).json({ message: e });
    }
});

const verifyUser = asyncHandler(async (req, res) => {
    const { phoneNumber, otp } = req.body;
    
});


module.exports = { signupUser };