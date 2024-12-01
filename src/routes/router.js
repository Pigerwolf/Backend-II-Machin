const express = require ("express");
const router = express.Router(); 

class Router {
    constructor() {
        this.router = router; 
        this.init(); 
    }

    //Método que te retorna el objeto router: 
    getRouter() {
        return this.router; 
    }

    //Métodos para las distintas operaciones: 

    get(path, ...callbacks) {
        this.router.get(path, this.generateCustomResponse ,this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (req, res, next) => {
            try {
                await callback(req, res, next); 
            } catch (error) {
                res.status(500).send("Error interno del servidor, vamos a sacarnos un 8"); 
            }
        })
    }

    //Custom Responses: 
    generateCustomResponse(req, res, next) {
        res.sendSuccess = payload => res.send({status: "success", payload});
        res.sendServerError = error => res.status(500).send({status: "error", error});
        res.sendUserError = error => res.status(400).send({status: "error", error})
        next(); 
    }
}

module.exports = Router; 