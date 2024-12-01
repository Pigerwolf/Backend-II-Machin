const { Router } = require("express");
const router = Router();
const jsonwebtoken = require("jsonwebtoken");
const passport = require("passport");
const UserModel = require ("../model/users.model")
const { createHash, isValidPassword } = require ("../utils/util")

//Register
router.post("/register", async (req, res) => {
    const {usuario, password} = req.body; 

    try {
        //Verificamos si ya existe el usuario. 
        const existeUsuario = await UserModel.findOne({ usuario }); 

        if (existeUsuario) {
            return res.status(400).send("El usuario ya existe en nuestra base de datos"); 
        }

        //Si no existe, lo puedo crear: 
        const nuevoUsuario = new UserModel({
            usuario, 
            password: createHash(password) 
        }); 

        await nuevoUsuario.save(); 

        //Generar el Token JWT
        const token = jwt.sign({usuario: nuevoUsuario.usuario}, "coderhouse", {expiresIn: "1h"}); 

        //Lo mandamos con la cookie. 

        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, 
            httpOnly: true
        })

        res.redirect("/api/sessions/current"); 

    } catch (error) {
        res.status(500).send("Error interno del servidor"); 
    }
})


//Login

router.post("/login", async (req, res) => {
    const {usuario, password} = req.body; 

    try {
        //Buscamos al usuario en MongoDB: 
        const usuarioEncontrado = await UserModel.findOne({usuario}); 

        //Si no lo encuentro, lo puedo mandar a registrarse: 
        if (!usuarioEncontrado) {
            return res.status(401).send("Usuario no registrado, date una vuelta por el registro"); 
        }

        //Verificamos la contraseña: 
        if(!isValidPassword(password, usuarioEncontrado)) {
            return res.status(401).send("Contraseña incorrecta"); 
        }

        //Generamos el token JWT: 
        
        const token = jwt.sign({usuario: usuarioEncontrado.usuario, rol: usuarioEncontrado.rol}, "coderhouse", {expiresIn: "1h"});

        //Enviamos con la cookie: 

        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, 
            httpOnly: true
        })

        res.redirect("/api/sessions/current"); 
    } catch (error) {
        res.status(500).send("Error interno del servidor"); 
    }
})

//Logout
router.post("/logout", (req, res) => {
    res.clearCookie("coderCookieToken"); 
    res.redirect("/login"); 
})  

//Current: 

router.get("/current", passport.authenticate("current", {session: false}), (req, res) => {
    res.render("home", {usuario: req.user.usuario}); 
})

//Admin

router.get("/admin", passport.authenticate("current", {session:false}), (req, res) => {
    if(req.user.rol !== "admin") {
        return res.status(403).send("Acceso denegado!"); 
    }

    res.render("admin"); 
})

module.exports = router;
