const express = require("express");
const router = express.Router();
const ProductManager = require ("../managers/product-manager.js");
const manager = new ProductManager ("./src/data/productos.json");

router.get("/", async (req, res) =>{
    const productos = await manager.getProducts();

    res.render("index", {productos})
})

router.get("/contacto", (req, res) => {
    res.render("contacto")
})

router.get("/tienda", async (req, res) => {
    const productos = await manager.getProducts();

    res.render("tienda", {productos})
})


module.exports = router;