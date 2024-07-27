// Importar http
//No me funcionó "const http = require ("http")"

/* import http from "http"

const server = http.createServer( (request, response) => {
    //Función callback (solicitad/recibir)
    //////////////////////////////////////

})
// Constante del Puerto

const PUERTO = 8080; 

//Parámetro: número de puerto y función callback
//           o comportamiento a realizar. 

server.listen(PUERTO, () => {

    console.log(`Escuchando el puerto ${PUERTO}`);

})

// `` ALT + 96 */

//De nuevo no me sirvió el Conts required

import express from "express"
const app = express();
const PUERTO = 8080; 

app.get("/", (req, res) =>{

    res.send("Sección Home")
})



app.listen(PUERTO, () =>{

    console.log("Escuchando el puerto de Express")

})

const misProductos = [

    {id: 1, nombre:"Fideos", precio: 2},
    {id: 2, nombre:"Arroz", precio: 2},
    {id: 3, nombre:"Pan", precio: 3},
    {id: 4, nombre:"Leche", precio: 1},
    {id: 5, nombre:"Queso", precio: 3},
    {id: 6, nombre:"Mermelada", precio: 1},
    {id: 7, nombre:"Vino", precio: 4},

]

app.get("/Productos", (req, res) => {
    res.send({misProductos})

});

//Ruta por ID

app.get("/Productos/:id", (req, res) => {
    //Se envía un request a través de la propiedad Params
    let {id} = req.params;

    let productoBuscado = misProductos.find(producto => producto.id == id);

    if (productoBuscado) {
        res.send(productoBuscado)
    } else {
        res.send("Producto no encontrado, todo va a explotar.")
    }
})

//Query se refiere a múltiples consultas a un endpoint, le tenemos que colocar "?" y el nombre de la consulta

app.get("/clientes", (req, res) =>{

/*  
    let nombre = req.query.nombre;
    let apellido = req.query.apellido; 
                                        */

    let {nombre, apellido} = req.query;

    res.send(`Bienvenido ${nombre} ${apellido}`)



})