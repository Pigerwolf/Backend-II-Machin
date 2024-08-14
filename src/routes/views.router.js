//Metodo para crear
const { Router } = require("express");

const router = Router();
// Rutas

router.get("/tienda", (req, res) => {
    res.render("tienda");
});

router.get("/contacto", (req, res) => {
    res.render("contacto");
});

router.get("/", (req, res) => {
    res.render("index");
});

//Metodo para exportar
module.exports = router;
