// getAPI()
// async function getAPI() {
//     await fetch('https://apipetshop.herokuapp.com/api/articulos')
//         .then(res => res.json())
//         .then(data => {

//             const productos = data.response;

//             let juguetes = productos.filter(producto => producto.tipo == 'Juguete');
//             let farmacia = productos.filter(producto => producto.tipo == 'Medicamento');


//             let arrayCarrito = [];

//             // escucharEvento(contenedorJuguetes, arrayCarrito);
//             // escucharEvento(contenedorFarmacia, arrayCarrito);

//         })
// }



// console.log(arrayCarrito);

// contenedorJuguetes.addEventListener('click', (e) => {
//     agregarProducto(e, arrayCarrito)
// });

// contenedorFarmacia.addEventListener('click', (e) => {
//     agregarProducto(e, arrayCarrito)
// });



