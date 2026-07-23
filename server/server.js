const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { connectDB, sequelize } = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const sitemapRoute = require("./routes/sitemapRoutes");
dotenv.config();

const app = express();


// ==============================
// Middlewares
// ==============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ 
    extended: true 
}));


// ==============================
// Static Folder
// ==============================

app.use(
    "/uploads",
    express.static("uploads")
);


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
        message: "Fashion Freude API Running with MySQL"
    });

});


// ==============================
// Server Start
// ==============================

const PORT = process.env.PORT || 5000;


const startServer = async () => {

    try {

        await connectDB();


        await sequelize.sync({
            alter: true
        });


        console.log("MySQL Tables Synced Successfully");


        app.listen(PORT, () => {

            console.log(
                `Server running on port ${PORT}`
            );

            console.log(
                `Sitemap: http://localhost:${PORT}/sitemap.xml`
            );

        });


    } catch (error) {

        console.log(error.message);

    }

};


startServer();