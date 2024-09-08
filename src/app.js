// `` ALT + 96 */
const express = require ("express")
const exphdbs = require ("express-handlebars");
const { mongoose } = require ("mongoose")
const {engine} = require ("express-handlebars");
const viewsRouter = require ("./routes/views.router.js")
const app = express(); 
const cartRouter = require("./dao/db/cart-manager-db.js");
const ProductManager = require("../src/dao/db/product-manager-db.js");
const herramientasRouter = require ("./dao/models/herramientas.model.js")
const manager = new ProductManager
require ("./database.js")

const PUERTO = 8080;

//Reconoce la extensión:

//Express Handlebars
app.engine("handlebars", engine());
app.engine("handlebars", exphdbs.engine()); 

//Renderiza através de handlebars:

app.set("view engine", "handlebars")

//Ubicación:

app.set("views", "./src/views"); 

//Middleware: 

app.use(express.json()); 
app.use(express.static("./src/public"))
app.use(express.urlencoded({extended:true}));

//Rutas
app.use("/herramientas", herramientasRouter)
app.use("/api/products", ProductManager)
app.use("/api/carts", cartRouter)
app.use("/",  viewsRouter);


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
//Array de Mensajes del Chat
/* 
let messages = []; */

//Chat En vivo       ↑ ↑ ↑ ↑ ↑ ↑


io.on("connection", async (socket) => {
    console.log("Se conectó un cliente");

    socket.emit("productos", await manager.getProducts());

    // Función para eliminar producto
    socket.on("eliminarProducto", async (id) => {
        await manager.eliminarProducto(id);
        io.sockets.emit("productos", await manager.getProducts());
    });

    // Función para crear o actualizar producto
    socket.on("crearProducto", async (producto) => {
        if (producto.id) {
            
            // Actualizar producto
            await manager.actualizarProducto(producto.id, producto);
        } else {

            await manager.crearProducto(producto);
        }
        io.sockets.emit("productos", await manager.getProducts());
    });
});