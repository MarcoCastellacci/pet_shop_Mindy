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

            // Mostrar el modal
            const modal = document.getElementById('modal');
            const input = document.getElementById('modal-input');
            const confirmBtn = document.getElementById('modal-confirm');
            const cancelBtn = document.getElementById('modal-cancel');

            input.value = '';
            input.focus();

            modal.style.display = 'block';

            return new Promise((resolve, reject) => {
                confirmBtn.onclick = () => {
                    const cantidad = parseInt(input.value);
                    if (!isNaN(cantidad) && cantidad > 0 && cantidad <= producto.disponibles) {
                        // Agregar la cantidad especificada al carrito
                        producto.cantidad = cantidad;
                        carrito.push(producto);
                        localStorage.setItem('carrito', JSON.stringify(carrito));

                        // Actualizar disponibilidad de stock
                        producto.disponibles -= cantidad;

                        modal.style.display = 'none';
                        resolve();
                    } else {
                        alert('La cantidad ingresada no es válida o supera la disponibilidad de stock.');
                    }
                };

                cancelBtn.onclick = () => {
                    modal.style.display = 'none';
                    reject();
                };
            });
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

    function showModal(message) {
        const modal = document.getElementById('modal');
        const input = document.getElementById('modal-input');
        const confirmBtn = document.getElementById('modal-confirm');
        const cancelBtn = document.getElementById('modal-cancel');

        input.value = '';
        input.focus();

        return new Promise((resolve, reject) => {
            confirmBtn.onclick = () => {
                const value = input.value;
                modal.style.display = 'none';
                resolve(value);
            };

            cancelBtn.onclick = () => {
                modal.style.display = 'none';
                reject();
            };

            modal.style.display = 'block';
        });
    }

    // Uso del popup modal personalizado
    showModal('Ingrese un valor:')
        .then(value => {
            console.log('Valor ingresado:', value);
        })
        .catch(() => {
            console.log('Operación cancelada');
        });



    getAPI()
    async function getAPI() {
        await fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(res => res.json())
            .then(data => {
                const productos = data;
                let productosMasVendidos = productos.filter(producto => producto.disponibles <= 3)

                let contenedorProductos = document.querySelector('.productos');
                let botonJuguete = document.querySelector(".boton-juguete");
                let botonFarma = document.querySelector(".boton-farma");
                let buscador = document.querySelector(".buscar-texto");

                let texto = "";

                let filtroCategoria = [];
                buscador.addEventListener("keyup", (e) => {
                    texto = e.target.value;
                    filtroCategoria.splice(0, filtroCategoria.length); // Vaciar el array de categorías
                    mostrarFiltro();
                });

                botonJuguete.addEventListener("click", (e) => {
                    if (e.target) {
                        console.log(e.target.id);
                        if (!filtroCategoria.includes(e.target.id) || filtroCategoria.length > 0) {
                            filtroCategoria.pop();
                            filtroCategoria.push(e.target.id);
                        }
                        mostrarFiltro();
                    }
                });

                botonFarma.addEventListener("click", (e) => {
                    if (e.target) {
                        console.log(e.target.id);
                        if (!filtroCategoria.includes(e.target.id) || filtroCategoria.length > 0) {
                            filtroCategoria.pop();
                            filtroCategoria.push(e.target.id);
                        }
                        mostrarFiltro();
                    }
                });

                buscador.addEventListener("keyup", (e) => {
                    texto = e.target.value;
                    filtroCategoria = []; // Vaciar el array de categorías al realizar una búsqueda
                    mostrarFiltro();
                });

                function mostrarFiltro() {
                    let filtro = productosMasVendidos;
                    console.log(filtroCategoria);
                    if (filtroCategoria.includes("Medicamento")) {
                        filtro = filtro.filter(producto => producto.categoria === "farmacia");
                    }
                    if (filtroCategoria.includes("Juguete")) {
                        filtro = filtro.filter(producto => producto.categoria === "jugueteria");
                    }
                    if (texto.trim() !== "") {
                        filtro = filtro.filter(producto => producto.producto.toLowerCase().includes(texto.toLowerCase().trim()));
                    }
                    console.log(filtro);
                    printCard(filtro, contenedorProductos);
                }
                mostrarFiltro()
            })
    }
})