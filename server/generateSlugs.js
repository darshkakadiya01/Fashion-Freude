const mongoose = require("mongoose");
const slugify = require("slugify");

const Product = require("./models/Product");

mongoose.connect("mongodb://127.0.0.1:27017/YOUR_DATABASE");

async function generateSlugs() {

    const products = await Product.find();

    for (const product of products) {

        product.slug = slugify(product.name, {
            lower: true,
            strict: true,
            trim: true
        });

        await product.save();

        console.log(product.slug);

    }

    console.log("Done");

    process.exit();
}

generateSlugs();