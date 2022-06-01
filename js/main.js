const contenedorJuguetes = document.querySelector('#contenedor-juguetes');
const contenedorFarmacia = document.querySelector('#contenedor-farmacia');
const cuerpoCarrito = document.querySelector('#lista-carrito');

function printCard(array, node) {
    node.innerHTML = '';
    array.forEach(producto => {
        console.log(producto.stock)
        if (producto.stock >= 5) {
            node.innerHTML += ` 
                        <div class="card col-4" style="width: 18rem;">              
                            <a href="detalles.html?id=${producto._id}">
                                <img class="img-card"  
                                    src="${producto.imagen}"> </a>           
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title font-weight-bold">${producto.nombre}</h5>
                                <p class="card-text contenedor-parrafo" style="margin-top: auto;">${producto.descripcion}</p>        
                                <div class="text-center" style="margin-top: auto;">
                                    <p class="card-text mb-1 fs-5 precio">$${producto.precio}</p>
                                    <a href="#" class="btn btn-naranja mt-3" onclick="agregarProducto('${producto._id}')">Agregar al carrito</a>
                                </div>
                            </div>
                        </div>`
        } else {

            node.innerHTML += `  
        <div class="card col-4" style="width: 18rem;">
            <span class="stock">ultimas unidades!</span>              
            <a href="detalles.html?id=${producto._id}">
                <img class="img-card"  
                    src="${producto.imagen}">  </a>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title font-weight-bold">${producto.nombre}</h5>
                <p class="card-text contenedor-parrafo" style="margin-top: auto;">${producto.descripcion}</p>
                <div class="text-center" style="margin-top: auto;">
                    <p class="card-text mb-1 fs-5 precio">$${producto.precio}</p>
                    <a href="#" class="btn btn-naranja mt-3" onclick="agregarProducto('${producto._id}')">Agregar al carrito</a>
                </div>
            </div>
        </div>`
        }
    })
}
let idEncontrado = [];

function agregarProducto(idProducto) {
    idEncontrado.push(idProducto)
    console.log(idEncontrado);
}



function buscarProductos(arrayID, arrayProductos) {
    let arrayResultado = [];
    arrayID.map(id => {
        arrayResultado.push(...arrayProductos.filter(producto => producto._id == id))
    })
    console.log(arrayResultado);
}

getAPI()
async function getAPI() {
    await fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(res => res.json())
        .then(data => {

            const productos = data.response;

            let juguetes = productos.filter(producto => producto.tipo == 'Juguete');
            let farmacia = productos.filter(producto => producto.tipo == 'Medicamento');


            let arrayCarrito = [];
            buscarProductos(idEncontrado, productos);
            agregarProducto(idEncontrado)
            printCard(juguetes, contenedorJuguetes);
            printCard(farmacia, contenedorFarmacia);
        })
}