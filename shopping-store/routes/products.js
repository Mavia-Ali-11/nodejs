const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: `${__dirname}/../uploads` });

const {
    getProducts,
    getProductById,
    getProductsStats,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/products");

router.get("/", getProducts);
router.get("/stats", getProductsStats);
router.get("/:id", getProductById);
router.post("/", upload.any(), createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;