const express = require("express");

const router = express.Router();

const {
  getCategories,
  addCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);

router.post("/add", addCategory);

router.delete("/delete/:id", deleteCategory);

module.exports = router;