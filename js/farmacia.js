getAPI()
function getAPI() {
    fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(res => res.json())
        .then(data => {

            const productos = data.response;

            let farmacia = productos.filter(producto => producto.tipo == 'Medicamento');

            const contenedorFarmacia = document.querySelector('#contenedor-farmacia');

            printCard(farmacia, contenedorFarmacia);
        })
}
