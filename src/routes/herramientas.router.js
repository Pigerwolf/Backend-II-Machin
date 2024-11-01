const Router = require("express");
const router = Router();

const HerramientaModel = require ("../dao/models/herramientas.model")

// Postman CRUD

//Read

router.get("/", async (req, res) => {
    try {
    const listadoHerramientas = await HerramientaModel.find()
    res.json(listadoHerramientas);
    }
    catch(error) {
        res.status(500).json({message:"Error en el servidor."})
    }
})



//Crear

router.post("/", async (req, res) => {
    const nuevoItem = req.body;
    
    try {

        const documentItem = new HerramientaModel (nuevoItem);
        await documentItem.save();
        res.send({message:"Item Creado", item: documentItem })
    }

    catch (error) {
        res.status(500).send("Error al crear item, es culpa de Carpi.")

    }

})


//Actualizar

router.put("/:id", async (req, res) =>{

    try {
        const item = await HerramientaModel.findByIdAndUpdate(req.params.id, req.body);
        if (!item) {
            return res.status(404).send("Item no encontrado.")
        }
        res.status(201).send({message: "Item Actualizado."})
    }
    catch (error) {
        res.status(500).send("Error al actualizar, es culpa de Carpi.")
    }
});

//Delete

router.delete("/:id", async (req, res) =>{

    try {
        const item = await HerramientaModel.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).send("Item no encontrado.")
        }
        res.status(201).send({message: "Item Eliminado."})
    }
    catch (error) {
        res.status(500).send("Error al Eliminar, También es culpa de Carpi.")
    }

});


module.exports = router;