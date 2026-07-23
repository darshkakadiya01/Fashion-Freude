const Product = require("../models/Product");
const slugify = require("slugify");
const { Op } = require("sequelize");

// ===============================
// Get All Products
// ===============================
exports.getProducts = async (req, res) => {
    try {

        const products = await Product.findAll({
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json(products);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ===============================
// Get Product By Slug
// ===============================
exports.getProductBySlug = async (req, res) => {

    try {

        const product = await Product.findOne({
            where: {
                slug: req.params.slug
            }
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json(product);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Add Product
// ===============================
exports.addProduct = async (req, res) => {

    try {

        const image = req.files?.image
            ? req.files.image[0].filename
            : "";

        const gallery = req.files?.gallery
            ? req.files.gallery.map(file => file.filename)
            : [];

        let slug = slugify(req.body.name, {
            lower: true,
            strict: true,
            trim: true
        });

        const exists = await Product.findOne({
            where: { slug }
        });

        if (exists) {
            slug = `${slug}-${Date.now()}`;
        }

        const product = await Product.create({

            name: req.body.name,

            slug,

            description: req.body.description,

            price: req.body.price,

            category: req.body.category,

            stock: req.body.stock,

            image,

            gallery

        });

        return res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product
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
// Update Product
// ===============================
exports.updateProduct = async (req, res) => {

    try {

        const product = await Product.findByPk(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        const updateData = {
            ...req.body
        };

        if (req.body.name) {

            let slug = slugify(req.body.name, {
                lower: true,
                strict: true,
                trim: true
            });

            if (slug !== product.slug) {

                const exists = await Product.findOne({
                    where: { slug }
                });

                if (exists) {
                    slug = `${slug}-${Date.now()}`;
                }

            }

            updateData.slug = slug;

        }

        if (req.files?.image) {
            updateData.image = req.files.image[0].filename;
        }

        if (req.files?.gallery) {
            updateData.gallery = req.files.gallery.map(file => file.filename);
        }

        await product.update(updateData);

        return res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            product
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
// Delete Product
// ===============================
exports.deleteProduct = async (req, res) => {

    try {

        const product = await Product.findByPk(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        await product.destroy();

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

        const category = req.params.category
            .replace(/-/g, " ")
            .trim()
            .toLowerCase();

        console.log("Requested Category:", category);

        const allProducts = await Product.findAll();

        console.log("All Categories:");
        allProducts.forEach((item) => {
            console.log(`[${item.category}]`);
        });

        const products = await Product.findAll({

            where: Product.sequelize.where(
                Product.sequelize.fn("LOWER", Product.sequelize.col("category")),
                category
            ),

            order: [["createdAt", "DESC"]]

        });

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

// ===============================
// Search Products
// ===============================
exports.searchProducts = async (req, res) => {

    try {

        const keyword = req.query.keyword || "";

        const products = await Product.findAll({

            where: {

                [Op.or]: [

                    {
                        name: {
                            [Op.like]: `%${keyword}%`
                        }
                    },

                    {
                        category: {
                            [Op.like]: `%${keyword}%`
                        }
                    },

                    {
                        description: {
                            [Op.like]: `%${keyword}%`
                        }
                    }

                ]

            },

            order: [["createdAt", "DESC"]]

        });

        return res.status(200).json(products);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};