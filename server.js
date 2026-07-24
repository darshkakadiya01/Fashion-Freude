const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load `.env.<NODE_ENV>` when it exists (e.g. .env.production), otherwise `.env`.
// Variables already present in the real environment — such as the ones Hostinger
// injects from its panel — always win, because dotenv never overwrites them.
const envByStage = path.join(__dirname, `.env.${process.env.NODE_ENV || "development"}`);
const envFile = fs.existsSync(envByStage) ? envByStage : path.join(__dirname, ".env");
dotenv.config({ path: envFile });

const app = require("./src/app");
const { connectDB, sequelize } = require("./src/config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        // `alter` re-adds a duplicate unique index on every boot (Sequelize quirk),
        // so it is opt-in via DB_SYNC_ALTER=true and only used when models change.
        const alter = process.env.DB_SYNC_ALTER === "true";
        await sequelize.sync(alter ? { alter: true } : undefined);
        console.log(`MySQL Tables Synced Successfully${alter ? " (alter)" : ""}`);

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Sitemap: http://localhost:${PORT}/sitemap.xml`);
        });
    } catch (error) {
        console.log(error.message);
    }
};

startServer();
