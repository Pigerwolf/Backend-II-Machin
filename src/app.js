// `` ALT + 96 */

const express = require ("express")
const {engine} = require ("express-handlebars");
const cookieParser = require ("cookie-parser");
const passport = require ("passport")
const { initializePassport } = require ("./config/passport.config.js")
const app = express(); 
const PUERTO = 8080;
require ("./database.js");
const usuarioRouter = require ("./routes/usuario.router.js")
const viewsRouter = require ("./routes/views.router.js");


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());
initializePassport(); 
app.use(passport.initialize()); 

//Express-Handlebars
app.engine("handlebars", engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

//Rutas
app.use("/api/sessions", usuarioRouter); 
app.use("/", viewsRouter); 

app.listen(PUERTO, () => {
    console.log(`Escuchando el puerto http://localhost:${PUERTO}`);
})