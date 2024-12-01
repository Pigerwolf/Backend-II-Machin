const { Router } = require("express");
const router = Router();

router.get("/register", (req, res) => {
    res.render("register"); 
})

router.get("/login", (req, res) => {
    res.render("login"); 
})

router.get("/", (req, res) => {
    res.render("home"); 
})

router.get("/admin", (req, res) => {
    res.render("admin"); 
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts"); 
})

module.exports = router;