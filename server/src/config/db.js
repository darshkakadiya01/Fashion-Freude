const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME || "shopsphere",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        dialect: "mysql",
        logging: false,
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ MySQL Connected Successfully");
    } catch (error) {
        console.error("❌ MySQL Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = {
    sequelize,
    connectDB,
};
