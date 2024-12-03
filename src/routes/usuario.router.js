const { Router } = require("express");
const router = Router();
const jsonwebtoken = require("jsonwebtoken");
const passport = require("passport");
const UserModel = require("../model/users.model");
const { createHash, isValidPassword } = require("../utils/util");

router.post("/register", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    console.log("Datos del registro:", { usuario, password });

    // Verificamos si el usuario ya existe

    const existeUsuario = await UserModel.findOne({ usuario });
    console.log("Existe el usuario?", !!existeUsuario);

    if (existeUsuario) {
      return res
        .status(400)
        .send("El usuario ya existe en la base de datos");
    }

    // Nuevo Usuario

    const nuevoUsuario = new UserModel({
      usuario,
      password: createHash(password),
    });
    console.log("Nuevo usuario creado con exito:", nuevoUsuario);

    await nuevoUsuario.save();
    console.log("Usuario guardado en la base de datos");

    // Generamos el Token JWT
    const token = jsonwebtoken.sign(
      { usuario: nuevoUsuario.usuario },
      "coderhouse",
      { expiresIn: "1h" }
    );
    console.log("Token generado:", token);

    // Enviamos el token como cookie
    res.cookie("coderCookieToken", token, {
      maxAge: 3600000,
      httpOnly: true,
    });
    console.log("Cookie enviada");

    // Si responde con éxito
    res.status(201).send("Usuario registrado exitosamente! Por fin!!!");
  } catch (error) {
    console.error("Fallo al intentar registrar a:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    console.log("Login con el usuario:", { usuario, password });

    // Buscar el usuario en la base de datos
    const usuarioEncontrado = await UserModel.findOne({ usuario });
    if (!usuarioEncontrado) {
      console.log("Usuario no encontrado... Meu Deus... Basta ya...");
      return res.status(401).send("Usuario no registrado.");
    }

    console.log("Usuario en la base de datos", usuarioEncontrado);

    // Verificar la contraseña
    const esValida = isValidPassword(password, usuarioEncontrado);
    console.log("Coincide la contraseña?", esValida);

    if (!esValida) {
      return res.status(401).send("Contraseña incorrecta.");
    }

    // Generar un token JWT
    const token = jsonwebtoken.sign(
      { usuario: usuarioEncontrado.usuario, rol: usuarioEncontrado.rol },
      "coderhouse",
      { expiresIn: "1h" }
    );
    console.log("Token generado:", token);

    // Guardar el token en una cookie
    res.cookie("coderCookieToken", token, {
      maxAge: 3600000,
      httpOnly: true,
    });

    //Si procede exitosamente
    res.status(200).send("Inicio de sesión exitoso.");
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).send("Error interno del servidor.");
  }
});

router.get("/logout", (req, res) => {
    res.clearCookie("coderCookieToken");
    res.redirect("/login");
  });

//Current:

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    res.render("home", { usuario: req.user.usuario });
  }
);

//Admin

router.get(
  "/admin",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    if (req.user.rol !== "admin") {
      return res.status(403).send("Acceso denegado! Aléjate malvado ladrón o Usuario que no tiene permiso de estar aquí... Shú! Shú!");
    }

    res.render("admin");
  }
);

//Version para GitHub:

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

// router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
// La estrategia de Github nos retornará el usuario, entonces lo usamos para colocarlo en el objeto de session:
// req.session.user = req.user;
// req.session.login = true;
// res.redirect("/profile");
// })


//Dejaré la depuración del código para poder guiarme mejor en lo que estoy haciendo, en esta parte tuve muchos problemas pero ya he logrado atinar a la solución.
//Obviamente es intencional ver los datos que estoy usando porque ha sido una locura y hablo de manera literal solucionar esto jajajajajaja 


module.exports = router;
