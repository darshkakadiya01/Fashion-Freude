// One-off utility: bulk-import products from scripts/products.json
// Usage: node scripts/importProducts.js
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");

require("dotenv").config();

const { connectDB, sequelize } = require("../src/config/db");
const Product = require("../src/models/Product");

async function importProducts() {
    await connectDB();
    await sequelize.sync();

    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "products.json"), "utf8"));

    for (const item of data) {
        let slug =
            item.slug ||
            slugify(item.name, {
                lower: true,
                strict: true,
            });

        const exists = await Product.findOne({
            where: { slug },
        });

        if (exists) {
            slug += "-" + Date.now();
        }

        await Product.create({
            name: item.name,
            slug,
            description: item.description,
            price: item.price,
            category: item.category,
            stock: item.stock || 0,
            image: item.image || "",
            gallery: item.gallery || [],
        });
    }

    console.log("Products Imported Successfully");
    process.exit(0);
}

importProducts().catch((err) => {
    console.error("Import failed:", err.message);
    process.exit(1);
});
