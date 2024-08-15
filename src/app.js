// `` ALT + 96 */

const express = require("express"); 
const app = express(); 
const exphdbs = require ("express-handlebars");
const cartRouter = require("./managers/cart-manager.js");
const ProductManager = require("./managers/product-manager.js")
const viewsRouter = require ("./routes/views.router.js")
const {engine} = require ("express-handlebars");
const PUERTO = 8080;

//Reconoce la extensión:

//Express Handlebars
app.engine("handlebars", engine());/*  */

app.engine("handlebars", exphdbs.engine()); /*  */

//Renderiza através de handlebars:

app.set("view engine", "handlebars")/*  */

//Ubicación:

app.set("views", "./src/views"); /*  */

//Middleware: 

app.use(express.json()); 
app.use(express.static("./src/public"))

//Rutas
app.use("/api/products", ProductManager)
app.use("/api/carts", cartRouter)
app.use("/",  viewsRouter);

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
/* 
io.on(`connection`, (socket) => {

/*     console.log("Un cliente conectó") */
/* 
    socket.on(`mensaje`, (data) => {
        console.log(data);
    })
 */
//Respuesta del Backend
   /*  socket.emit("Saludito", "Hola Cliente, esto es el Backend respondiendo.");
 */
//Enviar el array de Usuarios
/* 
    socket.emit(" usuarios", usuarios);

}); */