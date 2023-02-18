const express = require("express");
const apiRouter = express.Router();

const products = require("./products");
const branches = require("./branches");
const users = require("./users");

apiRouter.use("/product", products);
apiRouter.use("/branch", branches);
apiRouter.use("/user", users);

module.exports = apiRouter;