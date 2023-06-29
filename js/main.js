const contenedorJuguetes = document.querySelector('#contenedor-juguetes');
const contenedorFarmacia = document.querySelector('#contenedor-farmacia');
const cuerpoCarrito = document.querySelector('#lista-carrito');

getAPI()
async function getAPI() {
    await fetch('https://mindhub-xj03.onrender.com/api/petshop')
        .then(res => res.json())
        .then(data => {
            const productos = data;

            let juguetes = productos.filter(producto => producto.categoria == 'jugueteria');
            let farmacia = productos.filter(producto => producto.categoria == 'farmacia');
            printCard(juguetes, contenedorJuguetes);
            printCard(farmacia, contenedorFarmacia);
        })
}

function printCard(array, node) {
    node.innerHTML = '';
    array.forEach(producto => {
            node.innerHTML += `
                        <div class="card col-4" style="width: 18rem;">
                            <span class="stock">ultimas unidades</span>
                            <a href="detalles.html?id=${producto._id}">
                                <img class="img-card"
                                    src="${producto.imagen}">
                            </a>
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title font-weight-bold">${producto.producto}</h5>
                                <p class="card-text contenedor-parrafo" style="margin-top: auto;">${producto.descripcion}</p>
                                <div class="text-center" style="margin-top: auto;">
                                    <p class="card-text mb-1 fs-5 precio">$${producto.precio}</p>
                                    <button href="#" class="btn btn-naranja mt-3" id="btn${producto._id}">Agregar al carrito</button>
                                </div>
                            </div>
                        </div>`
    })
}

