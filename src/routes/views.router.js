const express = require("express");
const router = express.Router();
const ProductManager = require ("../dao/db/product-manager-db");
const manager = new ProductManager();

router.get("/", async (req, res) =>{
    const productos = await manager.getProducts();

    res.render("home", {productos})
})

router.get("/products", async (req, res) => {
    const productos = await manager.getProducts();

    res.render("products", {productos})
})
router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
})


module.exports = router;