const asyncHandler = require("express-async-handler");
const { User } = require("../models");

const signupUser = asyncHandler(async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword)
            return res.status(400).json({
                message: "Password and confirm password didn't match"
            }).end();

        const user = new User(req.body);
        const response = await user.save();
        
        res.status(201).json({ response });
    }
    catch (e) {
        if (e.code === 11000)
            res.status(409).json({
                message: `${e.keyValue.email || e.keyValue.phoneNumber} is already in use`
            });
        else res.status(400).json({ message: e });
    }
});

module.exports = { signupUser };