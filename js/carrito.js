document.addEventListener('DOMContentLoaded', function () {
    // Obtener el stock disponible de un producto
    async function getStockDisponible(productoId) {
        const response = await fetch(`https://mindhub-xj03.onrender.com/api/petshop/`);
        const data = await response.json();
        const producto = data.find(p => p._id === productoId);
        if (producto) {
            console.log(`Stock disponible para el producto ${productoId}: ${producto.disponibles}`);
            return producto.disponibles;
        } else {
            console.log(`No se encontró el producto con ID ${productoId}`);
            return 0;
        }
    }

    // Función para agregar productos al carrito
    function agregarAlCarrito(producto) {
        let carrito = [];
        if (localStorage.getItem('carrito')) {
            carrito = JSON.parse(localStorage.getItem('carrito'));
        }
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para mostrar el carrito de compras
    function mostrarCarrito() {
        const tablaCarrito = document.getElementById('lista-carrito');
        const arrayLocalStorage = JSON.parse(localStorage.getItem('carrito'));
        printCardCarrito(arrayLocalStorage, tablaCarrito);
        arrayLocalStorage.forEach(producto => {
            let botonDelete = document.querySelector(`#delete${producto._id}`);
            botonDelete.addEventListener('click', async (e) => {
                eliminarDelCarrito(producto._id);
                mostrarCarrito();
            });
        });
    }

    // Función para mostrar el stock disponible de cada producto en el carrito
    async function mostrarCantidadesDisponibles(carrito) {
        const promises = carrito.map(producto => getStockDisponible(producto._id));
        const cantidadesDisponibles = await Promise.all(promises);

        for (let i = 0; i < carrito.length; i++) {
            const producto = carrito[i];
            const stockDisponible = cantidadesDisponibles[i];
            console.log(`Producto: ${producto.producto}, Cantidad disponible: ${stockDisponible}`);
        }
    }

    function eliminarDelCarrito(productoId) {
        // Buscar el producto en el carrito por su ID
        const carrito = JSON.parse(localStorage.getItem('carrito'));
        const productoIndex = carrito.findIndex(producto => producto._id === productoId);

        if (productoIndex !== -1) {
            const producto = carrito[productoIndex];
            // Preguntar al usuario si desea eliminar una unidad o todas
            const confirmarEliminar = confirm('¿Deseas eliminar una unidad o todas?');
            if (confirmarEliminar) {
                if (producto.cantidad > 1) {
                    // Restar una unidad a la cantidad del producto en el carrito
                    producto.cantidad--;
                } else {
                    // Eliminar completamente el producto del carrito
                    carrito.splice(productoIndex, 1);
                }
            }
        }

        // Actualizar el carrito en el almacenamiento local
        localStorage.setItem('carrito', JSON.stringify(carrito));
        location.reload();
    }


    // Modificar la función printCardCarrito para incluir la cantidad disponible de cada producto
    function printCardCarrito(array, node) {
        node.innerHTML = '';
        console.log(array);
        array.forEach(producto => {
            node.innerHTML += `
        <div class="card col-4" style="width: 18rem;">
          <a href="detalles.html?id=${producto._id}">
            <img class="img-card" src="${producto.imagen}">
          </a>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title font-weight-bold">${producto.producto}</h5>
            <p class="card-text contenedor-parrafo" style="margin-top: auto;">${producto.descripcion}</p>
            <div class="text-center" style="margin-top: auto;">
              <p class="card-text mb-1 fs-5 precio">$${producto.precio}</p>
                <div>
                    <span class="cantidad">Cantidad: <span class="num-cantidad">${producto.cantidad}</span></span>
                </div>
              <button class="btn btn-danger mt-3" id="delete${producto._id}">Eliminar</button>
            </div>
          </div>
        </div>`;
        });
        // Mostrar las cantidades disponibles de cada producto en el carrito
        mostrarCantidadesDisponibles(array);
    }

    let btnVaciar = document.getElementById('btn-vaciar')
    btnVaciar.addEventListener('click', (e) => {
        // Obtener los datos del carrito del local storage
        const carrito = JSON.parse(localStorage.getItem('carrito'));

        // Verificar si el carrito existe y no está vacío
        if (carrito && carrito.length > 0) {
            // Vaciar el carrito
            carrito.length = 0;
            // Actualizar los datos del carrito en el local storage
            localStorage.setItem('carrito', JSON.stringify(carrito));
            console.log('El carrito ha sido vaciado correctamente.');
            // Recargar la página
            location.reload();
        } else {
            console.log('El carrito ya está vacío.');
        }
    })

    // Obtener el elemento del total del pre ticket
    const totalElement = document.getElementById('total');
    const totalElementCant = document.getElementById('total-cantidad');

    // Función para mostrar el pre ticket y el resumen de la compra
    function mostrarPreTicket() {
        // Obtener los datos del carrito del local storage
        const carrito = JSON.parse(localStorage.getItem('carrito'));

        // Verificar si el carrito existe y no está vacío
        if (carrito && carrito.length > 0) {
            // Calcular el total a pagar sumando los precios de los productos en el carrito
            const totalAPagar = carrito.reduce((total, producto) => total + producto.precio, 0);
            const totalCantida = carrito.reduce((total, producto) => total + producto.cantidad, 0)

            // Mostrar el total a pagar en el elemento correspondiente
            totalElement.textContent = `Total: $${totalAPagar.toFixed(2)}`;
            totalElementCant.textContent = `Cant. Productos: ${totalCantida}`;

            // Mostrar el resumen de la compra
            const resumenElement = document.createElement('div');
            resumenElement.classList.add('resumen-compra');

            carrito.forEach((producto) => {
                const productoElement = document.createElement('p');
                productoElement.textContent = `${producto.producto} - $${producto.precio.toFixed(2)}`;
                resumenElement.appendChild(productoElement);
            });

            // Agregar el resumen de la compra al componente del carrito
            // const carritoComprasElement = document.querySelector('.carritoCompras');
            // carritoComprasElement.appendChild(resumenElement);
        } else {
            totalElement.textContent = 'Total: $0.00';
        }
    }

    // Llamar a la función para mostrar el pre ticket y el resumen de la compra
    mostrarPreTicket();


    async function getAPI() {
        await fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(res => res.json())
            .then(data => {
                const productos = data;
                console.log(productos);
                let contenedorFarmacia = document.getElementById("contenedor-farmacia");
                let contenedorJuguetes = document.getElementById("contenedor-juguetes");

                if (contenedorFarmacia) {
                    let farmacia = productos.filter(producto => producto.categoria === 'farmacia');
                    farmacia.forEach(producto => {
                        let boton = document.getElementById(`btn${producto._id}`);
                        boton.addEventListener('click', async (e) => {
                            let id = e.target.dataset.id;
                            let productoClickeado = productos.find(elemento => elemento._id == id);
                            // Verificar si hay stock disponible
                            const stockDisponible = await getStockDisponible(productoClickeado._id);

                            if (stockDisponible > 0) {
                                agregarAlCarrito(productoClickeado);
                                mostrarCarrito();
                            } else {
                                console.log('No hay stock disponible para este producto.');
                            }
                        });
                    });
                    printCardCarrito(farmacia, contenedorFarmacia);
                }

                if (contenedorJuguetes) {
                    let juguetes = productos.filter(producto => producto.categoria === 'jugueteria');
                    juguetes.forEach(producto => {
                        let boton = document.getElementById(`btn${producto._id}`);
                        boton.addEventListener('click', async (e) => {
                            let id = e.target.dataset.id;
                            let productoClickeado = productos.find(elemento => elemento._id == id);
                            // Verificar si hay stock disponible
                            const stockDisponible = await getStockDisponible(productoClickeado._id);
                            if (stockDisponible > 0) {
                                agregarAlCarrito(productoClickeado);
                                mostrarCarrito();
                            } else {
                                console.log('No hay stock disponible para este producto.');
                            }
                        });
                    });
                    console.log(juguetes);
                    printCardCarrito(juguetes, contenedorJuguetes);
                }

                // Mostrar el carrito al cargar la página
                mostrarCarrito();
            });
    }

    getAPI();
});
