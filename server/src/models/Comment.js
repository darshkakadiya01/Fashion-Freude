const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Product = require("./Product");

const Comment = sequelize.define(
    "Comment",
    {
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: "id",
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Customer",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 5,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pending",
        },
    },
    {
        timestamps: true,
    }
);

Comment.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(Comment, { foreignKey: "productId", as: "comments" });

module.exports = Comment;
