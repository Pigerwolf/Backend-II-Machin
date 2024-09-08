// Instancia Socket.io
const socket = io(); 

//Listener

socket.on("productos", (data) => {
    //console.log(data);
    renderProductos(data); 
})

//ID: contenedorProductos

const renderProductos = (productos) => {
    const constenedorProductos = document.getElementById("contenedorProductos"); 
    constenedorProductos.innerHTML = ""; 

    productos.forEach(item => {
        const card = document.createElement("div"); 
        card.innerHTML = `  <p> ${item.id} </p>
                            <p> ${item.title} </p>
                            <p> ${item.price} </p>
                            <button> Eliminar </button>
                            `
        constenedorProductos.appendChild(card); 

        //Función Eliminar
        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id); 
            
        })
    })
}

const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id); 
        
    document.getElementById('formProducto').addEventListener('submit', (e) => {
        e.preventDefault();
    
        const id = document.getElementById('productoId').value;
        const title = document.getElementById('productoTitle').value;
        const price = parseFloat(document.getElementById('productoPrice').value);
    
        // Crear objeto del producto
        const producto = { id, title, price };
    
        // Emitir el evento para guardar el producto
        socket.emit('guardarProducto', producto);
    
        // Limpiar el formulario
        document.getElementById('formProducto').reset();
    });
}