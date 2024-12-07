const mongoose = require ("mongoose")


const usuarioSchema = new mongoose.Schema({
    nombre: String, 
    apellido: String, 
    legajo: Number
})

const UserModel = mongoose.model("usuarios", usuarioSchema); 

module.exports = UserModel;