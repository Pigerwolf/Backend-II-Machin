import { Promises as fs } from "fs";

class ProductManager {

    constructor(path) {

        this.products = [];
        this.path = path;

        } 

    async   addProduct(name, desciption, price, img, code, stock) {

        try { 
            
            const arrayProducts = await this.readFile();
    

            if ( !name || !desciption || !price || !img || !code || !stock)
                
                {console.log("Todos los campos son obligatorios.")
                return;
                }

            if (arrayProducts.some(item => item.code === code)){

                console.log("El código de este producto debe ser único")
                return;
            }

                let newID;
                do {
                    Math.floor(10000 + Math.random() * 90000).toString();
                } while (arrayProducts.some(item => item.id === newID))

                    const newProducts = {

                        id: newID,
                        name: name.toLowerCase(),
                        desciption,
                        price,
                        img,
                        code,
                        stock,
                        category,
                        status:true,
                        thumnails:thumnails || []
                    };

                    arrayProducts.push(newProducts);
                    await this.saveFile(arrayProducts);
                    console.log("Producto Agregado")
        }   catch (error){

            console.log("Error al agregar producto, todosvamoamorí")
            throw error;
        }    
    }

    async   getProduct() {

        try {
            const arrayProducts = await this.readFile();
            return arrayProducts;
        } catch (error) {
            console.log("Error al leer el archivo", error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const arrayProducts = await this.readFile();
            const search = arrayProducts.find(item => item.id === id);

            if (!search) {
                console.log("Producto no encontrado");
                return null;
            } else {
                console.log("Producto encontrado");
                return search;
            }
        } catch (error) {
            console.log("Error al leer el archivo", error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const arrayProducts = await this.readFile();

            const index = arrayProducts.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProducts.splice(index, 1);
                await this.saveFile(arrayProducts);
                console.log("Producto eliminado");
            } else {
                console.log("No se encontró el producto");
            }
        } catch (error) {
            console.log("Error al eliminar el producto", error);
            throw error;
        }
    }

    async updateProduct(id, productoActualizado) {
        try {
            const arrayProducts = await this.readFile();

            const index = arrayProducts.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProducts[index] = { ...arrayProducts[index], ...productoActualizado };
                await this.saveFile(arrayProducts);
                console.log("Producto actualizado");
            } else {
                console.log("No se encontró el producto");
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error);
            throw error;
        }
    }



    async saveFile(arrayProducts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
            throw error;
        }
    }

    async readFile() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProducts = JSON.parse(respuesta);
            return arrayProducts;
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            console.log("Error al leer un archivo", error);
            throw error;
        }
    }


}

export default ProductManager;