const express = require("express");
const apiRouter = express.Router();
const products = require("./products");
const branches = require("./branches");

apiRouter.use("/product", products);
apiRouter.use("/branch", branches);

module.exports = apiRouter;