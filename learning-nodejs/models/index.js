const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    avatar: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;