const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First name is required"]
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Must be a valid email: johndoe@gmail.com"]
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: [true, "Phone number is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8
    },
    role: {
        type: String,
        enum: {
            values: ["user", "sadmin", "dealer", "manager"],
            message: "Role can't be {VALUE}"
        },
        default: "user"
    },
    verificationOtp: String,
    isVerified: Boolean
});

const User = mongoose.model("User", userSchema);
module.exports = User;