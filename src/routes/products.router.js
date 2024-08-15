const express = require("express");
const ProductManager = require("../managers/product-manager");
const manager = new ProductManager("./src/data/productos.json");
const router = express.Router();

//Listar todos los productos: 
//http://localhost:8080/api/products?limit=2

router.get("/", async (req, res) => {
    const limit = req.query.limit;
    try {
        const arrayProductos = await manager.getProducts();
        if (limit) {
            res.send(arrayProductos.slice(0, limit));
        } else {
            res.send(arrayProductos);
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

//Buscar producto por id: 

router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const productos = await manager.getProductById(parseInt(id));

        if (!productos) {
            res.send("Producto no encontrado");
        } else {
            res.send(productos);
        }
    } catch (error) {
        res.send("Error al buscar ese id en los productos");
    }
})


//Agregar nuevo producto: 

router.post("/", async (req, res) => {
    const nuevoProducto = req.body;
    
    try {
        await manager.addProduct(nuevoProducto); 

        res.status(201).send("Producto agregado exitosamente"); 
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
})

module.exports = router; 