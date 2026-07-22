const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
    getProducts,
    searchProducts,
    getProductsByCategory,
    getProductBySlug,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

// ====================================
// Get All Products
// ====================================
router.get("/", getProducts);

// ====================================
// Search Products
// MUST BE BEFORE /:slug
// ====================================
router.get("/search", searchProducts);

// ====================================
// Category Products
// MUST BE BEFORE /:slug
// ====================================
router.get("/category/:category", getProductsByCategory);

// ====================================
// Single Product By Slug
// ====================================
router.get("/:slug", getProductBySlug);

// ====================================
// Add Product
// ====================================
router.post(
    "/add",
    upload.fields([
        {
            name: "image",
            maxCount: 1
        },
        {
            name: "gallery",
            maxCount: 4
        }
    ]),
    addProduct
);

router.put(
    "/update/:id",
    upload.fields([
        {
            name: "image",
            maxCount: 1
        },
        {
            name: "gallery",
            maxCount: 4
        }
    ]),
    updateProduct
);

// ====================================
// Delete Product
// ====================================
router.delete(
    "/delete/:id",
    deleteProduct
);

module.exports = router;