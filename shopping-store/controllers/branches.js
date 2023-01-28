const { response } = require("express");
const asyncHandler = require("express-async-handler");
const { Branch } = require("../models");

const createBranch = asyncHandler(async (req, res) => {
    try {
        const branch = new Branch({
            name: req.body.name,
            city: req.body.city,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            openingTime: req.body.openingTime,
            closingTime: req.body.closingTime,
            feedback: req.body.feedback
        });
        const response = await branch.save();
        res.json({ message: "Branch added successfully!" });
    } catch (e) {
        console.error(e);
        res.json({ message: e });
    }
});

const getBranches = asyncHandler(async (req, res) => {
    try {
        const response = await Branch.find();
        res.json({ response, count: response.length });
    } catch (e) {
        console.error(e);
        res.json({ message: e });
    }
});

module.exports = { createBranch, getBranches };