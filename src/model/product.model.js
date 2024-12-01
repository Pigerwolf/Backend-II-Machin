const mongoose = require("mongoose");

const productSchema = new mongoose.Schema ({
    title: {
        type: String,
        require:true
    },
    description: {
        type: String,
        require:true
    },
    price: {
        type: Number,
        require:true
    },
    img: {
        type: String,
        require:true
    },
    code: {
        type: String,
        require:true,
        unique: true
    },
    stock: {
        type: Number,
        require:true
    },
    thumbnails: {
        type: [String],
    },
})

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;