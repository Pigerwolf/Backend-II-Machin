// `` ALT + 96 */
const express = require ("express")
const exphdbs = require ("express-handlebars");
const { mongoose } = require ("mongoose");
const {engine} = require ("express-handlebars");
const viewsRouter = require ("./routes/views.router.js");
const app = express(); 
const cookieParser = require ("cookie-parser");
const cartRouter = require("./dao/db/cart-manager-db.js");
const ProductManager = require("../src/dao/db/product-manager-db.js");
const herramientasRouter = require ("./dao/models/herramientas.model.js");
const manager = new ProductManager;
const session = require ("express-session");
require ("./database.js");

const PUERTO = 8080;

//Reconoce la extensión:
const miAltaClave = "Pinky"
app.use(cookieParser(miAltaClave));

//Set Cookies

app.get("/setCookies", (req, res) => {

/*     res.cookie("coderCookie", "mi primera cookie").send("Cookie Seteada correctamente"); */
res.cookie("coderCookie", "Ahora hay una capa de seguridad", {signed: true}).send("Cookie seteada con firma y sin tiempo de vida")

})

//Lectura Cookies

app.get("/getCookies",(req, res) => {

    res.send(req.cookies.coderCookie)

})

//Recuperar Cookie Firmada

app.get("/RecuperarCookieFirmada", (req, res) => {

    let valorCookie = req.signedCookies.coderCookie;
    
    if (valorCookie) {
        res.send("Cookie firmada recuperada: " + valorCookie)

    }
    else{
        res.send("Cookie Inválida.")
    }

})

//Borrar Cookies

app.get("/borrarCookies", (req, res) => {

    res.clearCookie("coderCookie").send("Cookie Eliminada.")
})

//Express Handlebars
app.engine("handlebars", engine());
app.engine("handlebars", exphdbs.engine()); 

//Renderiza através de handlebars:

app.set("view engine", "handlebars")

//Ubicación:

app.set("views", "./src/views"); 

//Middleware: 

function auth(req, res, next){
    if (req.session.user === "coder") {
        return next();
    }
    return res.status(401).send("Error");
}

// SESSIONS
app.use(session({
    secret: "secretCoder",
    resave: true,
    //Inactividad del usuario
    saveUninitialized: true

}))

app.get("/session", (req, res) => {
    //Se almacena en el req.session
    if (req.session.counter) {
        req.session.counter++;
        res.send("Has visitado este sitio: " + req.session.counter + " veces")
    }
    else {
        req.session.counter = 1;
        res.send("Bienvenido al club!");
    }

})

//Login con Session

app.get("/login", (req, res) => {

    let {usuario, pass} = req.query;

    if (usuario === "coder" && pass === "house" ){
        req.session.user = usuario;
        res.send("Inicio de Sesión correctamente.")

    } else {
        res.send("Datos Incorrectos.")
    }

})

//Rura para gente logeada

app.get("/privado", auth, (req, res) => {
    res.send("Si estás aquí, te loggeaste correctamente.")

})

//Ruta del Log-out

app.get("/logout", (req, res) => {
    req.session.destroy ((error) =>{
        if(!error) res.send("Sessión Cerrada")
            else res.send({status: "error", body: error})
    })
});

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