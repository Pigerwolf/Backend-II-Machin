const { Router } = require ("express");
const router = Router(); 

router.get("/email/:email", (req, res) => {
    let email = req.params.email; 
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(patronCorreo.test(email)) {
        res.send("Email valido: " + email); 
    }else{
        res.send("Email invalido"); 
    }
})


    //VALIDANDO PARAMETROS 

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    
    res.send("Obteniendo un recurso a partir del param cliente: " + req.params.cliente);
})

router.post("/nombre/:cliente([a-z]+)", (req, res) => {
    
    res.send("Enviando un recurso a partir del param cliente");
})

router.put("/nombre/:cliente([a-z]+)", (req, res) => {
    
    res.send("Actualizando un recurso a partir del param cliente");
})


router.delete("/nombre/:cliente([a-z]+)", (req, res) => {
    
    res.send("Eliminando un recurso a partir del param cliente");
})

router.param("cliente", (req, res, next, cliente) => {
    const clientes = ["firulais", "messi", "maximo"]; 

    if(clientes.includes(cliente)) {
        req.cliente = cliente; 
        next(); 
    } else {
        res.status(404).send("Cliente no encontrado"); 
    }

})

module.exports = router;