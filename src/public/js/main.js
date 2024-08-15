console.log("Conectadísimo!")

// Instancia Socket.io

const socket = io();

// Emit y On 

/* socket.emit(`mensaje`, `esto es un emit desde el Cliente`);
 */
//Recibir mensaje del Backend

/* socket.on("Saludito", (data) => {
    console.log(data)
})
 */

//Recibir el Array de Productos

socket.on("productos", (data) => {
    const listaProductos = document.getElementById("contenedor-Productos")

    data.forEach(productos => {
        listaUsuarios.innerHTML += `<li> ${productos.tittle} - ${productos.description} - ${productos.price} </li>`
    })

});