const Router = require("express");
const router = Router();
const UserModel = require ("../model/users.model");
const {createHash, isValidPassword} = require ("../utils/util");
const passport = require("passport");

/* router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {

        const UserExist = await UserModel.findOne({email: email});

        if(UserExist) {
        
            return res.status(400).send("Usuario ya existe.")            
        }

            const newUser = await UserModel.create({
                first_name,
                last_name,
                email,
                password: createHash(password),
                age
            })

            //Almacenar

            req.session.user = {
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                age: newUser.age
            }
            req.session.login = true

            res.status(200).send("Usuario Creado con éxtio!")

    } catch (error){res.status(500).send("Error del servidor.")}

            //Login


    router.post("/login"), async (req, res) => {
        const { email, password } = req.body;
    
        try {
            const user = await UserModel.findOne({email: email});

            if(user) {

                if(user.password === password) {
                    req.sessions.user = {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        age: user.age
                    }
                    req.session.login = true
                    res.redirect("/profile")
                } 
                else {
                    res.status(401).send("Usuario o contraseña inválido.")
                }
    
            } else {
                res.status(404).send("Usuario o contraseña no se encontró registrado.")
            }
            
        } catch (error) {
            res.status(500).send("Error del servidor.")
        }
    }
})

//Logout

router.get("/logout", (req, res) =>{
    if(req.session.login) {
        req.sessions.destroy();
    }
    res.redirect("/login")
}) */

//Versión Passport

router.post("/register", passport.authenticate("register", {failureRedirect:"/api/sessions/failedregister"})  ,async(req, res) => {
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age, 
        email: req.user.email
    }

    req.session.login = true;
    res.redirect("/profile");
})

router.get("/failedregister", (req, res) => {
    res.send("Registro fallido");
})

router.post("/login", passport.authenticate("login", {failureRedirect: "/api/sessions/faillogin"}) ,async (req, res) => {
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age, 
        email: req.user.email
    }

    req.session.login = true;
    res.redirect("/profile");
})

router.get("/faillogin", async (req, res) => {
    res.send("Error al iniciar sesión, todos vamos a explotar! ¡Huyan!");
})



//Logout 

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy(); 
    }
    res.redirect("/login"); 
})


module.exports = router;

