const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "shopsphere",   // <-- અહીં database નામ
    "root",
    "",
    {
        host: "localhost",
        dialect: "mysql",
        logging: false
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
    connectDB
};