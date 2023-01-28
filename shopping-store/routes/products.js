const express = require("express");
const router = express.Router();
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
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;