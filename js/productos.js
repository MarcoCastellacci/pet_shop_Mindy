const contenedorJuguetes = document.querySelector('#contenedor-juguetes');
const contenedorFarmacia = document.querySelector('#contenedor-farmacia');
const cuerpoCarrito = document.querySelector('#lista-carrito');


getAPI();
async function getAPI() {
    await fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(res => res.json())
        .then(data => {

            const productos = data.response;


            if (contenedorFarmacia) {

                let farmacia = productos.filter(producto => producto.tipo == 'Medicamento');

                printCard(farmacia, contenedorFarmacia);

                // eventoAgregarProducto(farmacia, productos, carrito);


            } else if (contenedorJuguetes) {

                let juguetes = productos.filter(producto => producto.tipo == 'Juguete');

                printCard(juguetes, contenedorJuguetes);
                // eventoAgregarProducto(juguetes, productos, carrito);

                
            } else {
                console.log('estoy en el carrito');
                
            }


            
        })

}


/**
 * 
 * @param {array con productos} array 
 * @param {nodo donde se van a imprimir los productos} node 
 */
function printCard(array, node) {

    node.innerHTML = '';

    array.forEach(producto => {

        node.innerHTML += `
                        <div class="card card-contenedora col-4" style="width: 18rem;">
                            <span class="stock">ultimas unidades</span>              
                            <a href="detalles.html?id=${producto._id}">
                                <img class="img-card"  
                                    src="${producto.imagen}">
                            </a>
                
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title font-weight-bold">${producto.nombre}</h5>
                                <p class="card-text contenedor-parrafo" style="margin-top: auto;">${producto.descripcion}</p>
                
                                <div class="text-center" style="margin-top: auto;">
                                    <p class="card-text mb-1 fs-5 precio">$${producto.precio}</p>
                                    <button onclick="addCarrito(${producto._id})"href="#" class="btn btn-naranja mt-3" id="btn${producto._id}">Agregar al carrito</button>
                                </div>
                            </div>
                        </div>`
    })

}

let arrayCarrito = [];
async function addCarrito(id) {

    if (arrayCarrito.indexOf(id) !== -1) {

        arrayCarrito.splice(arrayCarrito.indexOf(id), 1);

    } else {
        arrayCarrito.push(id);
    }

    localStorage.setItem("carrito", JSON.stringify(arrayCarrito) )

    console.log(arrayCarrito);
}

function filtros() {

    let data = [];


}
