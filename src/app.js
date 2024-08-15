// Importar http
//~~ No me funcionó "const http = require ("http")"
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
const app = express(); 
const exphdbs = require ("express-handlebars");
const cartRouter = require("./Managers/cart-Manager.js");
const PUERTO = 8080;
const viewsRouter = require ("./routes/views.router.js")
const arrayProductos = ("src/Data/Productos.json")
const {engine} = require ("express-handlebars");


//Array de Usuarios

const usuarios = [

    { id: 1, name: 'John', lastName: 'Doe' },
  
    { id: 2, name: 'Jane', lastName: 'Doe' },
  
    { id: 3, name: 'Juan', lastName: 'Doe' },
  
    {id: 4, name: 'Julia', lastName: 'Doe' },
  
    {id: 5, name: 'Jose', lastName: 'Doe' },
  
  ]

//Reconoce la extensión:

app.engine("handlebars", exphdbs.engine());

//Express Handlebars
app.engine("handlebars", engine());

//Renderiza através de handlebars:

app.set("view engine", "handlebars")

//Ubicación:

app.set("views", "./src/views");

//Middleware: 

app.use(express.json()); 
app.use(express.static("./src/public"))


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

app.use ("/", viewsRouter);
app.get("/", (req, res) => {
    res.send("Funcciona?")

})
//Listen

// Referencia del Server ⬇ ⬇ ⬇ ⬇ 

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto http://localhost:${PUERTO}/`); 
})

// Socket.io 

const Server = require("socket.io");

// Instancia WebSocket

const io = Server (httpServer);

//Instancia desde el Backend

io.on(`connection`, (socket) => {

/*     console.log("Un cliente conectó") */

    socket.on(`mensaje`, (data) => {
        console.log(data);
    })

//Respuesta del Backend
    socket.emit("Saludito", "Hola Cliente, esto es el Backend respondiendo.");

//Enviar el array de Usuarios

    socket.emit("usuarios", usuarios);

});