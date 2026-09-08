const Category = require("../models/Category");

// ===============================
// Add Category
// ===============================
exports.addCategory = async (req, res) => {
    try {
        const category = await Category.create({
            name: req.body.name,
            image: req.body.image,
        });

        return res.status(201).json({
            success: true,
            message: "Category Added Successfully",
            category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Get Categories
// ===============================
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Get Single Category
// ===============================
exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Update Category
// ===============================
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        const oldName = category.name;
        const newName = req.body.name ? req.body.name.trim() : oldName;

        await category.update({
            name: newName,
            image: req.body.image !== undefined ? req.body.image : category.image,
        });

        if (oldName && newName && oldName !== newName) {
            try {
                const Product = require("../models/Product");
                await Product.update(
                    { category: newName },
                    { where: { category: oldName } }
                );
            } catch (prodErr) {
                console.warn("Could not cascade category name update to products:", prodErr.message);
            }
        }

        return res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Delete Category
// ===============================
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        await category.destroy();

        return res.status(200).json({
            success: true,
            message: "Category Deleted Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
