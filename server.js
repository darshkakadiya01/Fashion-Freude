const dotenv = require("dotenv");
dotenv.config();

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
