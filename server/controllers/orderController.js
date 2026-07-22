const Order = require("../models/Order");

// Create New Order
const createOrder = async (req, res) => {

    try {

        const order = new Order(req.body);

        await order.save();

        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            order
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Get All Orders
const getOrders = async (req, res) => {

    try {

        const orders = await Order.find().sort({
            createdAt: -1
        });

        res.status(200).json(orders);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Get Single Order
const getOrderById = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });

        }

        res.status(200).json(order);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Update Order Status
const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            {
                status: req.body.status
            },

            {
                new: true
            }

        );

        res.status(200).json({
            success: true,
            message: "Order Updated Successfully",
            order
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Delete Order
const deleteOrder = async (req, res) => {

    try {

        await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Order Deleted Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

module.exports = {

    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder

};