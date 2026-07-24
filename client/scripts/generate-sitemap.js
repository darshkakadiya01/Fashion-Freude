/**
 * Generates client/public/sitemap.xml so it is served from the storefront domain
 * (https://fashionfreude.com/sitemap.xml), not the API subdomain.
 *
 * Runs automatically before `npm run build`.
 *
 * Env:
 *   SITE_URL              storefront origin      (default https://fashionfreude.com)
 *   REACT_APP_BASE_URL    API origin, used to pull live products/categories
 *
 * If the API is unreachable the build still succeeds — the sitemap is written with
 * the static pages and blog articles only.
 */
const fs = require("fs");
const path = require("path");

const SITE_URL = (process.env.SITE_URL || "https://fashionfreude.com").replace(/\/$/, "");
const API_URL = (process.env.REACT_APP_BASE_URL || "https://api.fashionfreude.com").replace(
    /\/$/,
    ""
);

const BLOGS_DIR = path.join(__dirname, "..", "src", "blogs");
const OUTPUT = path.join(__dirname, "..", "public", "sitemap.xml");

// Pages worth indexing. Cart, checkout, login, register and admin are deliberately excluded.
const STATIC_PAGES = [
    { loc: "/", changefreq: "daily", priority: "1.0" },
    { loc: "/blog", changefreq: "weekly", priority: "0.8" },
    { loc: "/about-us", changefreq: "monthly", priority: "0.6" },
    { loc: "/contact-us", changefreq: "monthly", priority: "0.6" },
    { loc: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
    { loc: "/refund_returns", changefreq: "yearly", priority: "0.3" },
    { loc: "/terms-and-condition", changefreq: "yearly", priority: "0.3" },
];

const slugify = (text) =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const escapeXml = (value) =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

const isoDate = (value) => {
    const date = value ? new Date(value) : new Date();
    return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
};

// Blog routes mirror the filenames in src/blogs (e.g. best-pant.js -> /best-pant),
// so the list stays correct as articles are added or removed.
const getBlogRoutes = () =>
    fs
        .readdirSync(BLOGS_DIR)
        .filter((file) => file.endsWith(".js") && file !== "Blogs.js")
        .map((file) => `/${file.replace(/\.js$/, "")}`)
        .sort();

const fetchJson = async (url) => {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
};

const urlEntry = ({ loc, lastmod, changefreq, priority }) =>
    [
        "  <url>",
        `    <loc>${escapeXml(SITE_URL + loc)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
    ].join("\n");

async function generate() {
    const now = new Date().toISOString();
    const entries = [];

    STATIC_PAGES.forEach((page) => entries.push({ ...page, lastmod: now }));

    getBlogRoutes().forEach((loc) =>
        entries.push({ loc, lastmod: now, changefreq: "monthly", priority: "0.7" })
    );

    let products = [];
    let categories = [];

    try {
        [products, categories] = await Promise.all([
            fetchJson(`${API_URL}/api/products`),
            fetchJson(`${API_URL}/api/categories`),
        ]);
    } catch (error) {
        console.warn(
            `  ! sitemap: could not reach API at ${API_URL} (${error.message}).\n` +
                "    Writing sitemap with static pages and blogs only."
        );
    }

    (Array.isArray(categories) ? categories : []).forEach((category) => {
        const slug = category.slug || (category.name ? slugify(category.name) : "");
        if (!slug) return;
        entries.push({
            loc: `/category/${slug}`,
            lastmod: isoDate(category.updatedAt),
            changefreq: "weekly",
            priority: "0.8",
        });
    });

    (Array.isArray(products) ? products : []).forEach((product) => {
        const slug = product.slug || (product.name ? slugify(product.name) : "");
        if (!slug) return;
        entries.push({
            loc: `/product/${slug}`,
            lastmod: isoDate(product.updatedAt),
            changefreq: "weekly",
            priority: "0.9",
        });
    });

    // Guard against duplicate URLs (e.g. a category slug colliding with a static page)
    const seen = new Set();
    const unique = entries.filter((entry) => {
        if (seen.has(entry.loc)) return false;
        seen.add(entry.loc);
        return true;
    });

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...unique.map(urlEntry),
        "</urlset>",
        "",
    ].join("\n");

    fs.writeFileSync(OUTPUT, xml, "utf8");

    console.log(
        `  sitemap: ${unique.length} urls -> public/sitemap.xml ` +
            `(${STATIC_PAGES.length} pages, ${getBlogRoutes().length} blogs, ` +
            `${categories.length || 0} categories, ${products.length || 0} products)`
    );
}

generate().catch((error) => {
    // Never fail the production build because of the sitemap.
    console.error("  ! sitemap generation failed:", error.message);
});
