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
            buscador.addEventListener("keyup", (e) => {
                texto = e.target.value;
                mostarFiltro();
            })

            function mostarFiltro() {
                let filtro = [];
                if (texto != "") {
                    filtro.push(...farmacia.filter(producto => producto.producto.toLowerCase().includes((texto.toLowerCase().trim()))));
                } else filtro.push(...farmacia);
                printCard(filtro, contenedorFarmacia);
            }
            mostarFiltro()
        })
}