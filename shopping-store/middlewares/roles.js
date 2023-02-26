const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const util = require("util");
const jwtVerify = util.promisify(jwt.verify);

module.exports = function (roles) {
    return asyncHandler(async (req, res, next) => {
        const token = req.get("Authorization").replace("Bearer ", "");
        if (token === "null")
            return res.status(403).json({
                message: "Signup/Login to perform this operation."
            });

        const user = await jwtVerify(token, process.env.SECRET);
        if (!roles.includes(user.role)) {
            return res.status(403).json({
                message: user.role + "s are restricted to do this operation."
            });
        }
        next();
    });
}