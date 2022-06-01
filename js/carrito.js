const contenedorJuguetes = document.querySelector('#contenedor-juguetes');
const contenedorFarmacia = document.querySelector('#contenedor-farmacia');

// /**
//  * 
//  * @param {array del carrito} objeto 
//  * @param {nodo donde se van a imprimir los productos} node 
//  */
// function printCarrito(objeto, node) {

//     let fila = document.createElement('tr');

//     fila.innerHTML += `
//         <td>
//                         <img src="${objeto.imagen}" alt="">
//                         <p>${objeto.nombre}</p>
//                     </td>
//                     <td>
//                         <label>
//                         <input type="number" value="${objeto.cantidad}" min="1" max="10">
//                         </label>
//                     </td>
//                     <td>
//                         <p>$${objeto.precio}</p>
//                     </td>
//                     <td>
//                         <p>$${objeto.precio}</p>
//                     </td>
//                     <td>
//                         <button onclick="eliminarProductoCarrito(${objeto.id})" class="eliminar" type="button" name="eliminar">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="trash bi bi-trash3-fill" viewBox="0 0 16 16">
//                             <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
//                             </svg>
//                             Eliminar
//                         </button>
//                     </td>
//     `

//     node.appendChild(fila);

// }

/**
 * 
 * @param {array con productos} array 
 * @param {nodo donde se van a imprimir los productos} node 
 */
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
                                    <button href="#" class="btn btn-naranja mt-3" id="btn${producto._id}">Agregar al carrito</button>
                                </div>
                            </div>
                        </div>`
    })
}

/**
 * 
 * @param {array de todos mis productos} arrayProductos 
 * @param {id del producto} idProducto 
 * @param {array vacio del carrito donde se va a pushear el producto agregardo} arrayCarrito 
 */
// function agregarProducto(arrayProductos, idProducto, arrayCarrito) {

//     let producto = arrayProductos.find(elemento => elemento._id == idProducto);

//     const { nombre, _id, precio, imagen, stock } = producto;

//     let objetoProducto = { nombre, id: _id, precio, imagen, stock, cantidad: 1 }

//     arrayCarrito.push(objetoProducto);

// }

// /**
//  * 
//  * @param {juguetes o farmacia} arrayProductosFiltrados 
//  * @param {todos mis productos} arrayTodosMisProductos 
//  * @param {array carrto} arrayCarrito 
//  */
// function eventoAgregarProducto(arrayProductosFiltrados, arrayTodosMisProductos, arrayCarrito) {

//     arrayProductosFiltrados.forEach(producto => {

//         let boton = document.querySelector(`#btn${producto._id}`);

//         boton.addEventListener('click', (e) => {

//             let idProducto = e.target.id.split('btn').join('');

//             agregarProducto(arrayTodosMisProductos, idProducto, arrayCarrito);

//             // localStorage.setItem('array-carrito', JSON.stringify(carrito));

//             // window.location()
//         })

//     })

// }

// var carrito = []; // ARRAY DONDE SE VAN A GUARDAR MIS PRODUCTOS

// revisar si hay datos en mi local storage


// function revisarLocal () {

//     if (localStorage.getItem('farmacia')) {

//         console.log('hay elementos de farmacia en el local');

//         // GUARDAR ESOS ELEMENTOS EN UNA VARIABLE Y A ESA PUSHEARLE LOS NUEVOS

//         carritoNuevo.push(JSON.parse(localStorage.getItem('farmacia')));


//     }

//     if (localStorage.getItem('juguete')) {

//         console.log('hay elementos de juguete en el local');

//         // GUARDAR ESOS ELEMENTOS EN UNA VARIABLE Y A ESA PUSHEARLE LOS NUEVOS

//         carritoNuevo.push(JSON.parse(localStorage.getItem('juguete')));

//     }
// }


    // llamada a mi base de datos
    getAPI();
    async function getAPI() {

        await fetch('https://apipetshop.herokuapp.com/api/articulos')
            .then(res => res.json())
            .then(data => {

                const productos = data.response;

                let carrito = [];

                // VEREIFICAR SI YA TIENE CONTENIDO MI LOCAL STORAGE

                if (contenedorFarmacia) {

                    let farmacia = productos.filter(producto => producto.tipo == 'Medicamento');

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

                            carrito = [...carrito, productoClickeado];


                            localStorage.setItem('carrito', JSON.stringify(carrito)) // CREO UNA KEY DEL ARRAY DE JUGUETES

                            
                        })
                    })

                }

                if (contenedorJuguetes) {

                    let juguetes = productos.filter(producto => producto.tipo == 'Juguete');

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

                            carrito = [...carrito, productoClickeado];

                            localStorage.setItem('carrito', JSON.stringify(carrito)) // CREO UNA KEY DEL ARRAY DE JUGUETES

                        })
                    })

                }

                


            })

    }

