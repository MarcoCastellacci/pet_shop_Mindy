document.addEventListener('DOMContentLoaded', function () {
    function printCard(array, node) {
        node.innerHTML = '';
        array.forEach(producto => {
            const stockText = producto.disponibles <= 3 ? '<span class="stock">ultimas unidades</span>' : '';
            node.innerHTML += `
      <div class="card col-4" style="width: 18rem;">
        ${stockText}
        <a href="detalles.html?id=${producto._id}">
          <img class="img-card" src="${producto.imagen}">
        </a>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title font-weight-bold">${producto.producto}</h5>
          <p class="card-text contenedor-parrafo" style="margin-top: auto;">${producto.descripcion}</p>
          <div class="text-center" style="margin-top: auto;">
            <p class="card-text mb-1 fs-5 precio">$${producto.precio}</p>
            <button href="#" class="btn btn-naranja mt-3" data-id="${producto._id}">Agregar al carrito</button>
          </div>
        </div>
      </div>`;
        });

        function agregarAlCarrito(producto) {
            let carrito = [];

            if (localStorage.getItem('carrito')) {
                carrito = JSON.parse(localStorage.getItem('carrito'));
            }

            // Verificar disponibilidad de stock
            if (producto.disponibles > 0) {
                // Preguntar al usuario cuántas unidades desea agregar
                const unidadesAgregar = prompt(`Ingrese la cantidad de "${producto.producto}" que desea agregar al carrito:`);

                // Validar la cantidad ingresada
                const unidades = parseInt(unidadesAgregar);
                if (!isNaN(unidades) && unidades > 0 && unidades <= producto.disponibles) {
                    // Agregar la cantidad especificada al carrito
                    producto.cantidad = unidades;
                    carrito.push(producto);
                    localStorage.setItem('carrito', JSON.stringify(carrito));

                    // Actualizar disponibilidad de stock
                    producto.disponibles -= unidades;

                    console.log('Producto agregado al carrito:', producto);
                    console.log('Carrito actualizado:', carrito);
                } else {
                    alert('La cantidad ingresada no es válida o supera la disponibilidad de stock.');
                }
            } else {
                alert('No hay unidades disponibles para agregar al carrito.');
            }
        }

        // Agregar evento click a los botones de "Agregar al carrito"
        const botonesAgregar = node.querySelectorAll('.btn-naranja');
        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', e => {
                const productId = e.target.dataset.id;
                const producto = array.find(p => p._id === productId);
                agregarAlCarrito(producto)
                    .then(() => {
                        mostrarCarrito();
                    })
                    .catch(() => {
                        // Operación cancelada
                    });
            });
        });
    }


    getAPI()
    async function getAPI() {
        await fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(res => res.json())
            .then(data => {
                const productos = data;

                let farmacia = productos.filter(producto => producto.categoria == 'farmacia');
                let contenedorFarmacia = document.getElementById("contenedor-farmacia");
                let buscador = document.querySelector(".buscar-texto");
                let texto = "";

                let filtroCategoria = [];
                buscador.addEventListener("keyup", (e) => {
                    texto = e.target.value;
                    filtroCategoria.splice(0, filtroCategoria.length); // Vaciar el array de categorías
                    mostrarFiltro();
                });

                function mostrarFiltro() {
                    let filtro = [];
                    if (texto != "") {
                        filtro.push(...farmacia.filter(producto => producto.producto.toLowerCase().includes((texto.toLowerCase().trim()))));
                    } else filtro.push(...farmacia);
                    console.log(filtro);
                    printCard(filtro, contenedorFarmacia);
                }
                mostrarFiltro()
            })
    }
})