const mongoose = require ("mongoose")

//DB 

mongoose.connect("mongodb+srv://EuCortex:backend1@clustor0.n8cvr.mongodb.net/TryOne?retryWrites=true&w=majority&appName=Clustor0")
    .then(() => console.log("Nos conectamos correctamente, esto va a mi currículo."))
    .catch (() => console.log("Me voy a morir."))
