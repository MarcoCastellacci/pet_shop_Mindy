let tablaCarrito = document.getElementById('lista-carrito');

async function getAPI() {
    await fetch('https://mindhub-xj03.onrender.com/api/petshop')
        .then(res => res.json())
        .then(data => {
            const productos = data;
            let carrito = [];
            // VEREIFICAR SI YA TIENE CONTENIDO MI LOCAL STORAGE            
                if (contenedorFarmacia) {

                    let farmacia = productos.filter(producto => producto.categoria == 'Medicamento');

                    printCard(farmacia, contenedorFarmacia);

                    farmacia.forEach(producto => {

                        let boton = document.querySelector(`#btn${producto._id}`); // BOTON DE MI PRODUCTO

                        boton.addEventListener('click', (e) => { // CADA VEZ QUE HAGO CLICK EN AGREGAR CARRITO

                            if (localStorage.getItem('carrito')) {

                                // GUARDAR ESOS ELEMENTOS EN UNA VARIABLE Y A ESA PUSHEARLE LOS NUEVOS

                                carrito = JSON.parse(localStorage.getItem('carrito'));

                            }

                            let id = e.target.id.split('btn').join(''); // GUARDO MI ID CLICKEADO

                            let productoClickeado = productos.find(elemento => elemento._id == id); // GUARDO EL OBJETO DE MI PRODUCTO CLICKEADO
                            console.log(productoClickeado);
                            carrito = [...carrito, productoClickeado];


                            localStorage.setItem('carrito', JSON.stringify(carrito)) // CREO UNA KEY DEL ARRAY DE JUGUETES
                            console.log(carrito);


                        })
                    })

                }

                if (contenedorJuguetes) {

                    let juguetes = productos.filter(producto => producto.categoria == 'Juguete');

                    printCard(juguetes, contenedorJuguetes);

                    juguetes.forEach(producto => {

                        let boton = document.querySelector(`#btn${producto._id}`); // BOTON DE MI PRODUCTO

                        boton.addEventListener('click', (e) => { // CADA VEZ QUE HAGO CLICK EN AGREGAR CARRITO

                            if (localStorage.getItem('carrito')) {

                                // GUARDAR ESOS ELEMENTOS EN UNA VARIABLE Y A ESA PUSHEARLE LOS NUEVOS

                                carrito = JSON.parse(localStorage.getItem('carrito'));

                            }


                            let id = e.target.id.split('btn').join(''); // GUARDO MI ID CLICKEADO

                            let productoClickeado = productos.find(elemento => elemento._id == id); // GUARDO EL OBJETO DE MI PRODUCTO CLICKEADO
                            console.log(productoClickeado);

                            carrito = [...carrito, productoClickeado];

                            localStorage.setItem('carrito', JSON.stringify(carrito)) // CREO UNA KEY DEL ARRAY DE JUGUETES

                            console.log(carrito);
                        })
                    })


                }
                // --------------------------


                let arrayLocalStorage = JSON.parse(localStorage.getItem('carrito'));


                printCardCarrito(arrayLocalStorage, tablaCarrito);

                // ==============
                arrayLocalStorage.forEach(producto => {

                    let botonDelete = document.querySelector(`#delete${producto._id}`);

                    botonDelete.addEventListener('click', (e) => {

                        console.log(`eliminando ${producto.producto}..`);

                        let contenedorPadre = e.target.parentNode.parentNode.parentNode;
                        contenedorPadre.classList.add('card-delete');

                    })

                    
                })
        })


        
}
getAPI();


function printCardCarrito(array, node) {

    node.innerHTML = '';

    array

    array.forEach(producto => {


        node.innerHTML += `
                        <div class="card col-4" style="width: 18rem;">              
                            <a href="detalles.html?id=${producto._id}">
                                <img class="img-card"  
                                    src="${producto.imagen}">
                            </a>
                
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title font-weight-bold">${producto.producto}</h5>
                                <p class="card-text contenedor-parrafo" style="margin-top: auto;">${producto.descripcion}</p>
                
                                <div class="text-center" style="margin-top: auto;">
                                    <p class="card-text mb-1 fs-5 precio">$${producto.precio}</p>
                                    <button class="btn btn-danger mt-3" id="delete${producto._id}">Eliminar</button>
                                </div>
                            </div>
                        </div>`

    })

}

function cantidadesParaCarrito(productosCarrito) {
    let cantidad = [];
    productosCarrito.forEach(producto => {
        if (!cantidad[producto.producto]) {
            cantidad[producto.producto] = {
                cantidad: 1,
                nombre: producto.producto,
                precio: producto.precio,
                id: producto._id
            };
        } else {
            cantidad[producto.producto].cantidad = cantidad[producto.producto].cantidad + 1;
        }
    })
    return cantidad;
}

function mostrarTotales(carritodecompras) {
    let total = 0;
    let html = "";
    carritodecompras.forEach(producto => {
        let totalPorProducto = producto.cantidad * producto.precio;
        total += totalPorProducto;
        html += ` <p> ${total}</p>`;
    })

    document.getElementById('total').innerHTML = html;
}

function vaciarCarrito() {

    localStorage.clear();
    location.reload();
}
