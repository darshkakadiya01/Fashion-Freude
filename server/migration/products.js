const fs = require("fs");
const Product = require("../models/Product");
const slugify = require("slugify");

async function importProducts() {
    const data = JSON.parse(
        fs.readFileSync("./migration/products.json", "utf8")
    );

    for (const item of data) {

        let slug = item.slug || slugify(item.name, {
            lower: true,
            strict: true
        });

        const exists = await Product.findOne({
            where: { slug }
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
            gallery: item.gallery || []
        });
    }

    console.log("Products Imported Successfully");
}

importProducts();