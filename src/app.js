// Importar http
//No me funcionó "const http = require ("http")"

/* import http from "http"

const server = http.createServer( (request, response) => {
    //Función callback (solicitad/recibir)
    //////////////////////////////////////

})
// Constante del Puerto

const PUERTO = 8080; 

//Parámetro: número de puerto y función callback
//           o comportamiento a realizar. 

server.listen(PUERTO, () => {

    console.log(`Escuchando el puerto ${PUERTO}`);

})

// `` ALT + 96 */

const express = require("express"); 
const productRouter = require("./Managers/product-Manager.js");
const cartRouter = require("./Managers/cart-Manager.js");
const ProductManager = require ("./Managers/product-Manager.js")
const manager = new ProductManager("./src/Data/Productos.json");
const app = express(); 
const PUERTO = 8080;

//Middleware: 
app.use(express.json()); 
//Le decimos al servidor que vamos a trabajar con JSON. 

app.get("/products", async (req, res) => {
    const arrayProductos =  await manager.getProducts();
    res.send(arrayProductos)

})

app.get("/products/:pid", async (req, res) => {

    let id = req.params.pid;

    const producto = await manager.getProductById(parseInt(id));
    if( !producto ) {

    res.send("No se encontró el producto, todos vamos a explotar.") 
    }
    else {
        res.send({producto})
    }
});

//Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`); 
})