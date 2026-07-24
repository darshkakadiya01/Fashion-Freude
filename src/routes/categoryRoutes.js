const express = require("express");
const router = express.Router();

const {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");

// Get All Categories
router.get("/", getCategories);

// Get Single Category
router.get("/:id", getCategory);

// Add Category
router.post("/add", addCategory);

// Update Category
router.put("/update/:id", updateCategory);

// Delete Category
router.delete("/delete/:id", deleteCategory);

module.exports = router;
