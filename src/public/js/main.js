console.log("Hola...... Perro.")

// Instancia Socket.io

const socket = io();

// Emit y On 

socket.emit(`mensaje`, `esto es un emit desde el Cliente`);

//Recibir mensaje del Backend

socket.on("Saludito", (data) => {
    console.log(data)
})


//Recibir el Array de usuarios

socket.on("usuarios", (data) => {
    const listaUsuarios = document.getElementById("lista-usuarios")

    data.forEach(usuarios => {
        listaUsuarios.innerHTML += `<li> ${usuarios.name} - ${usuarios.lastName} </li>`
    })

}) 