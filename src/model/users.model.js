const mongoose = require ("mongoose")

const usuarioSchema = new mongoose.Schema({
    usuario: String,
    password: String,
    rol: {
        type: String,
        enum: ["admin", "user"], 
        default: "user"
    }
})

const UserModel = mongoose.model("usuarios", usuarioSchema); 

module.exports = UserModel;