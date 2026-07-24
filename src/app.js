const path = require("path");
const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const sitemapRoute = require("./routes/sitemapRoutes");

const app = express();

// ==============================
// Middlewares
// ==============================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// Static Folder (server/uploads)
// ==============================

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// ==============================
// API Routes
// ==============================

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", authRoutes);
app.use("/api/orders", orderRoutes);

// ==============================
// Sitemap Route
// ==============================

app.use("/", sitemapRoute);

// ==============================
// Home Route
// ==============================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Fashion Freude API Running with MySQL",
    });
});

// ==============================
// 404 Handler
// ==============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
});

// ==============================
// Central Error Handler
// ==============================

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
