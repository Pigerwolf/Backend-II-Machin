const express = require("express");
const router = express.Router();
const ProductManager = require ("../managers/product-manager.js");
const manager = new ProductManager ("./src/data/productos.json");

router.get("/", (req, res) =>{
    res.render("index")
})

router.get("/products", async (req, res) => {
    const productos = await manager.getProducts();

    res.render("index", {productos})
})

module.exports = router;