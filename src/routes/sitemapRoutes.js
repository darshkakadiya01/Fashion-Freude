const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Category = require("../models/Category");

// ==============================
// Dynamic Sitemap
// ==============================

router.get("/sitemap.xml", async (req, res) => {
    try {
        const baseUrl = process.env.BASE_URL || "http://localhost:3000";

        const products = await Product.findAll();

        const categories = await Category.findAll();

        let xml = `<?xml version="1.0" encoding="UTF-8"?>`;

        xml += `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

        // ==============================
        // Static Pages
        // ==============================

        const pages = [
            "",
            "/about-us",
            "/blogs",
            "/contact-us",
            "/privacy-policy",
            "/refund_returns",
            "/terms-and-condition",
        ];

        pages.forEach((page) => {
            xml += `
<url>

    <loc>${baseUrl}${page}</loc>

    <lastmod>${new Date().toISOString()}</lastmod>

    <changefreq>weekly</changefreq>

    <priority>${page === "" ? "1.0" : "0.8"}</priority>

</url>
`;
        });

        // ==============================
        // Category Pages
        // ==============================

        categories.forEach((category) => {
            let slug = category.slug;

            if (!slug && category.name) {
                slug = category.name
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-");
            }

            if (!slug) return;

            xml += `
<url>

    <loc>${baseUrl}/category/${slug}</loc>

    <lastmod>${category.updatedAt || new Date().toISOString()}</lastmod>

    <changefreq>weekly</changefreq>

    <priority>0.8</priority>

</url>
`;
        });

        // ==============================
        // Product Pages
        // ==============================

        products.forEach((product) => {
            let slug = product.slug;

            if (!slug && product.name) {
                slug = product.name
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-");
            }

            if (!slug) return;

            xml += `
<url>

    <loc>${baseUrl}/product/${slug}</loc>

    <lastmod>${product.updatedAt || new Date().toISOString()}</lastmod>

    <changefreq>weekly</changefreq>

    <priority>0.9</priority>

</url>
`;
        });

        // ==============================
        // Blog Pages
        // ==============================

        const blogs = [
            "top-saree-styles-trends",
            "womens-best-nail-paint",
            "womens-best-hair-styles",
            "womens-best-heels",
            "womens-best-lipstick",
            "best-budget-friendly-wallet",
            "best-eyeliners",
            "essential-features-wallet",
            "perfect-wallet-for-your-lifestyle",
            "wallet-vs-clutch",
            "stylish-womens-wallets",
            "makeup-for-different-face-shapes-tips-to-enhance-your-natural-features",
            "day-to-night-makeup-transformation",
            "foundation-for-your-skin-tone",
            "everyday-natural-makeup-look-step-by-step-guide-for-beginners",
            "makeup-products",
            "womens-shoe-styles-trends",
            "best-track-pant",
            "best-t-shirt",
            "best-pant",
        ];

        blogs.forEach((blog) => {
            xml += `
<url>

    <loc>${baseUrl}/${blog}</loc>

    <lastmod>${new Date().toISOString()}</lastmod>

    <changefreq>monthly</changefreq>

    <priority>0.8</priority>

</url>
`;
        });

        xml += `
</urlset>
`;

        res.header("Content-Type", "application/xml");

        res.send(xml);
    } catch (error) {
        console.log("Sitemap Error:", error);

        res.status(500).json({
            success: false,

            message: error.message,
        });
    }
});

module.exports = router;
