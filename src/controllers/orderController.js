const Order = require("../models/Order");

// ===============================
// Create New Order
// ===============================
exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            order,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Get All Orders
// ===============================
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json(orders);
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Get Single Order
// ===============================
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found",
            });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Update Order Status
// ===============================
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found",
            });
        }

        await order.update({
            status: req.body.status,
        });

        return res.status(200).json({
            success: true,
            message: "Order Updated Successfully",
            order,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Delete Order
// ===============================
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found",
            });
        }

        await order.destroy();

        return res.status(200).json({
            success: true,
            message: "Order Deleted Successfully",
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
