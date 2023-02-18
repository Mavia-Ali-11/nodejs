const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares");

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
router.put("/:id", upload.any(), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;