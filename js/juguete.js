
getAPI()
function getAPI() {
    fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(res => res.json())
        .then(data => {

            const productos = data.response;

            let juguetes = productos.filter(producto => producto.tipo == 'Juguete');

            const contenedorJuguetes = document.querySelector('#contenedor-juguetes');


            printCard(juguetes, contenedorJuguetes);
        })
}
