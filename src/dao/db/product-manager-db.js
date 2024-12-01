const ProductModel = require("../models/product.model");

class ProductManager {
  async addProduct({
    title,
    description,
    price,
    category,
    img,
    code,
    stock,
    thumnails,
  }) {
    try {
      if (
        !title ||
        !description ||
        !price ||
        !img ||
        !code ||
        !stock 
      ) {
        console.log("Todos los campos son obligatorios");
        return;
      }

      //Validación
      const existeCodigo = await ProductModel.findOne({ code: code });

      if (existeCodigo) {
        console.log("El código debe ser único, o apoyas a Carpi!");
        return;
      }

      // Crear producto

      const nuevoProducto = new ProductModel({
        title,
        description,
        price,
        img,
        code,
        stock,
        thumnails
      });

      // Save

      await nuevoProducto.save();
    } catch (error) {}
  }

  async getProducts() {
    try {
      const arrayProductos = await ProductModel.find();
      return arrayProductos;
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async getProductById(id) {
    try {
      const buscado = await ProductModel.findById(id);
      if (!buscado) {
        console.log("producto no encontrado");
        return null;
      } else {
        console.log("Producto encontrado");
        return buscado;
      }
    } catch (error) {
      console.log("Error al buscar por id", error);
    }
  }

  //Método para actualizar productos:

  async updateProduct(id, productoActualizado) {
    try {
      const updated = await ProductModel.findByIdAndUpdate(
        id,
        productoActualizado
      );

      if (!uptaded) {
        console.log("No se pudo updatear tu producto miserable.");
        return null;
      }
      return updated;
    } catch (error) {
      console.log(
        "Hubo un error actualizando los productos... Debe ser culpa Carpi."
      );
    }
  }

  async deleteProduct(id) {
    try {
      const deleteado = await ProductModel.findByIdAndDelete(id);
      if (!deleteado) {
        console.log("No se pudo eliminar");
        return null;
      }
      return deleteado;
    } catch (error) {
      console.log("Tenemos un error al eliminar productos");
    }
  }
}

module.exports = ProductManager;
