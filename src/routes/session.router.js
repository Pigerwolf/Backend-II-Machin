const Router = require("express");
const router = Router();
const UserModel = require ("../model/users.model")

router.post('/register', async (req, res) => {
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
                password,
                age
            })

            //Almacenar

            req.session.user = {
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                age: newUser.age
            }

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

module.exports = router;