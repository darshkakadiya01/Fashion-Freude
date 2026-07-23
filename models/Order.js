const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Order = sequelize.define(
  "Order",
  {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
    },

    state: {
      type: DataTypes.STRING,
    },

    pincode: {
      type: DataTypes.STRING,
    },

    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    paymentMethod: {
      type: DataTypes.STRING,
      defaultValue: "COD",
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },

    products: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Order;