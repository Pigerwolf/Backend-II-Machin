const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/product-manager-db");
const manager = new ProductManager();

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
});

//Buscar producto por id:

router.get("/:pid", async (req, res) => {
  let id = req.params.pid;
  try {
    const productos = await manager.getProductById(id);

    if (!productos) {
      res.send("Producto no encontrado");
    } else {
      res.send(productos);
    }
  } catch (error) {
    res.send("Error al buscar ese id en los productos");
  }
});

//Agregar nuevo producto:

router.post("/", async (req, res) => {
  const nuevoProducto = req.body;

  try {
    await manager.addProduct(nuevoProducto);

    res.status(201).send("Producto agregado exitosamente");
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

//Actualizar por ID

router.put("/pid", async (req, res) => {
  const productoActualizado = req.body;
  const id = req.params.pid;

  try {
    await manager.updateProduct(id, productoActualizado);
    res.jason({
      message: "Producto Actualizado",
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Elimninar

router.delete("/pid", async (req, res) => {
  const productoEliminado = req.body;
  const id = req.params.pid;

  try {
    await manager.deleteProduct(id, productoEliminado);
    res.jason({
      message: "Producto Eliminado",
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;