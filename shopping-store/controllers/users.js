const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const randomString = require("randomstring");
const jwt = require("jsonwebtoken");

const signupUser = asyncHandler(async (req, res) => {
    try {
        const { email = "", phoneNumber, password, confirmPassword } = req.body;

        const emailExist = await User.findOne({ email, isVerified: true });
        if (emailExist) return res.status(400).json({
            message: "This email address is already in use."
        }).end();

        if (password !== confirmPassword)
            return res.status(400).json({
                message: "Password and confirm password didn't match."
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
            otp: req.body.verificationOtp,
            message: "Enter the OTP sent on your phone to verify account."
        });
    }
    catch (e) {
        if (e.code === 11000)
            res.status(409).json({
                message: "This phone number is already in use. Login?"
            });
        else res.status(400).json({ message: e });
    }
});


const loginUser = asyncHandler(async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        const user = await User.findOne({ phoneNumber, isVerified: true });

        if (!user) return res.status(400).json({
            message: "User not found. Signup?"
        }).end();

        const userPassword = await bcrypt.compare(password, user.password);
        if (!userPassword) return res.status(400).json({
            message: "Incorrect password."
        }).end();

        const otp = randomString.generate({ length: 4, charset: "numeric" })
        await User.updateOne(
            { _id: user._id },
            { $set: { verificationOtp: otp } }
        );

        res.status(200).json({
            otp,
            message: "Enter the OTP sent on your phone to verify its you."
        }).end();

    } catch (e) {
        res.status(400).json({ message: e });
    }
});

const verifyUser = asyncHandler(async (req, res) => {
    try {
        const { phoneNumber, otp, isLogging } = req.body;

        const user = await User.findOne({ phoneNumber, verificationOtp: otp });

        if (!user) return res.status(400).json({ message: "Incorrect OTP." }).end();

        await User.updateOne(
            { _id: user._id },
            {
                $set: { isVerified: true },
                $unset: { verificationOtp: 1 }
            }
        );

        const response = { message: "Verification successful." };

        if (isLogging) {
            response.token = jwt.sign(
                {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role
                },
                process.env.SECRET,
                { expiresIn: process.env.JWT_EXPIRES }
            );
        }

        res.status(200).json(response);
    } catch (e) {
        res.status(400).json({ message: e });
    }
});

const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ count: users.length, users });
    } catch (e) {
        res.status(400).json({ message: e });
    }
});

module.exports = { signupUser, loginUser, verifyUser, getUsers };