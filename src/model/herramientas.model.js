const { mongoose } = require("mongoose");

 const herramientasCollection = "herramientas";

 const herramientasSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    img: String,
    code: String,
    stock: Number
    
 });

 const HerramientaModel = mongoose.model(herramientasCollection, herramientasSchema);

module.exports = HerramientaModel;