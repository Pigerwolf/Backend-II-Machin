// `` ALT + 96 */

const express = require ("express")
const {engine} = require ("express-handlebars");
const cookieParser = require ("cookie-parser");
const passport = require ("passport")
const UserModel = require ("./model/users.model.js")
const objectConfig = require ("./config/config.js")
const mongoose = require ("mongoose")
const { initializePassport } = require ("./config/passport.config.js")
const app = express(); 
require ("./database.js");
const usuarioRouter = require ("./routes/usuario.router.js")
const viewsRouter = require ("./routes/views.router.js");
const { mongo_url, puerto} = objectConfig

//Middleware
app.get("/favicon.ico", (req, res) => res.status(204).end());
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

mongoose.connect(mongo_url)
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log("Llueve sólo sobre mis ventanas", error))

app.listen(puerto, () => {
    console.log(`Escuchando en el puerto ${puerto}`); 
})