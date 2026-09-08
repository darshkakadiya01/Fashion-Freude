const path = require("path");
const dotenv = require("dotenv");

const envByStage = path.join(__dirname, "..", `.env.${process.env.NODE_ENV || "development"}`);
const envFile = require("fs").existsSync(envByStage) ? envByStage : path.join(__dirname, "..", ".env");
dotenv.config({ path: envFile });

const { sequelize } = require("../src/config/db");
const { DataTypes } = require("sequelize");

async function migrate() {
    try {
        await sequelize.authenticate();
        console.log("Connected to database.");

        const queryInterface = sequelize.getQueryInterface();
        const table = await queryInterface.describeTable("Products");

        if (!table.buyNowUrl) {
            console.log("Adding buyNowUrl column to Products table...");
            await queryInterface.addColumn("Products", "buyNowUrl", {
                type: DataTypes.TEXT,
                allowNull: true,
                defaultValue: null,
            });
            console.log("Successfully added buyNowUrl column!");
        } else {
            console.log("buyNowUrl column already exists in Products table.");
        }

        process.exit(0);
    } catch (err) {
        console.error("Migration error:", err);
        process.exit(1);
    }
}

migrate();
