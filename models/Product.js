const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    category: {
        type: String,
        required: true
    },

    stock: {
        type: Number,
        default: 0
    },

    image: {
        type: String,
        default: ""
    },

    gallery: {
        type: [String],
        default: []
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);