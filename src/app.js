// Importar http
//No me funcionó "const http = require ("http")"

import http from "http"

const server = http.createServer( (request, response) => {
    //Función callback (solicitad/recibir)
    console.log("Se realizo una peticion al servidor"); 

    response.end("!"); 

})
// Constante del Puerto

const PUERTO = 8080; 

//Parámetro: número de puerto y función callback
//           o comportamiento a realizar. 

server.listen(PUERTO, () => {

    console.log(`Escuchando el puerto ${PUERTO}`);

})

// `` ALT + 96

