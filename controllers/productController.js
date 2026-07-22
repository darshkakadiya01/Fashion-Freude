const Product = require("../models/Product");
const slugify = require("slugify");

// ===============================
// Get All Products
// ===============================
exports.getProducts = async (req, res) => {

    try {

        const products = await Product.find().sort({ createdAt: -1 });

        return res.status(200).json(products);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Get Single Product
// ===============================
exports.getProductBySlug = async (req, res) => {

    try {

        const product = await Product.findOne({
            slug: req.params.slug
        });

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        res.json(product);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// ===============================
// Add Product
// ===============================
exports.addProduct = async (req, res) => {

    try {

        const product = new Product({

            name: req.body.name,

            slug: slugify(req.body.name, {
                lower: true,
                strict: true,
                trim: true
            }),

            description: req.body.description,

            price: req.body.price,

            category: req.body.category,

            stock: req.body.stock,

            image: req.body.image,

            gallery: req.body.gallery || []

        });

        await product.save();

        res.json(product);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// ===============================
// Update Product
// ===============================

exports.updateProduct = async (req, res) => {

    try {

        req.body.slug = slugify(req.body.name, {
            lower: true,
            strict: true,
            trim: true
        });

        const product = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );

        res.json(product);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// ===============================
// Delete Product
// ===============================
exports.deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({

                success: false,
                message: "Product not found"

            });

        }

        await Product.findByIdAndDelete(req.params.id);

        return res.status(200).json({

            success: true,
            message: "Product Deleted Successfully"

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// ===============================
// Get Products By Category
// ===============================
exports.getProductsByCategory = async (req, res) => {

    try {

        console.log("========== CATEGORY API ==========");
        console.log("Requested Category:", req.params.category);

        // Show all products in database
        const allProducts = await Product.find();

        console.log("All Products:");
        allProducts.forEach((item) => {
            console.log(
                "Name:",
                item.name,
                "| Category:",
                item.category
            );
        });

        const products = await Product.find({
            category: {
                $regex: new RegExp(
                    "^" +
                    req.params.category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
                    "$",
                    "i"
                )
            }
        }).sort({ createdAt: -1 });

        console.log("Matched Products:", products.length);

        return res.status(200).json(products);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.searchProducts = async (req, res) => {

    try {

        const keyword = req.query.keyword || "";

        const products = await Product.find({

            $or: [

                {
                    name: {
                        $regex: keyword,
                        $options: "i"
                    }
                },

                {
                    category: {
                        $regex: keyword,
                        $options: "i"
                    }
                },

                {
                    description: {
                        $regex: keyword,
                        $options: "i"
                    }
                }

            ]

        }).sort({ createdAt: -1 });

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};