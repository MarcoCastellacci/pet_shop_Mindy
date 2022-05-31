const contenedorJuguetes = document.querySelector('#contenedor-juguetes');
const contenedorFarmacia = document.querySelector('#contenedor-farmacia');
const cuerpoCarrito = document.querySelector('#lista-carrito');

let arrayCarrito = [];

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
                                <h5 class="card-title font-weight-bold">${producto.nombre}</h5>
                                <p class="card-text contenedor-parrafo" style="margin-top: auto;">${producto.descripcion}</p>
                
                                <div class="text-center" style="margin-top: auto;">
                                    <p class="card-text mb-1 fs-5 precio">$${producto.precio}</p>
                                    <a href="#" class="btn btn-naranja mt-3" onclick="agregarProducto('${producto._id}')">Agregar al carrito</a>
                                </div>
                            </div>
                        </div>`


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

        })
}

// console.log(btnAgregarCarrito);
// const extraerID = str => str.split('?id=')[1];






// contenedorJuguetes.addEventListener('click', (e) => {

//     agregarProducto(e, arrayCarrito);

// })

// contenedorFarmacia.addEventListener('click', (e) => {

//     agregarProducto(e, arrayCarrito);

// })




// function agregarProducto(e, array) {

//     e.preventDefault();
//     // console.log(e.target.classList.contains('btn'));

//     if (e.target.classList.contains('btn')) {
//         const contenedorCurso = e.target.parentElement.parentElement.parentElement;

//         leerCurso(contenedorCurso, array);

//         // console.log(contenedorCurso);
//         // console.log(contenedorCurso.querySelector('img').src );
//         // console.log(contenedorCurso.querySelector('.card-title').textContent);
//         // console.log( extraerID(contenedorCurso.querySelector('.card > a').getAttribute('href')) );
//     }
// }


// function leerCurso(curso, array) {

//     let datosCurso = {
//         imagen: curso.querySelector('img').src,
//         titulo: curso.querySelector('.card-title').textContent,
//         precio: curso.querySelector('.precio').textContent,
//         id: extraerID(curso.querySelector('.card > a').getAttribute('href')),
//         cantidad: 1
//     }

//     console.log(datosCurso);

//     array.push(datosCurso);
//     console.log(array);
//     // console.log(arrayCarrito);
// }

// function imprimirCarrito(arrayProductos, nodo) {

//     arrayProductos.forEach(producto => {

//         const fila = document.createElement('tr');

//         fila.innerHTML = `<td>
//                             <img src="${producto.imagen}" alt="">
//                             <p>${producto.nombre}</p>
//                         </td>
//                         <td>
//                             <label>
//                             <input type="number" value="${producto.cantidad}" min="1" max="10">
//                             </label>
//                         </td>
//                         <td>
//                             <p>${producto.precio}</p>
//                         </td>
//                         <td>
//                             <p>${producto.precio}</p>
//                         </td>
//                         <td>
//                             <button class="eliminar" type="button" name="eliminar">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="trash bi bi-trash3-fill" viewBox="0 0 16 16">
//                                 <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
//                                 </svg>
//                                 Eliminar
//                             </button>
//                         </td>`

//         nodo.appendChild(fila);
//     })

// }