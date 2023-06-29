getAPI()
async function getAPI() {
    await fetch('https://mindhub-xj03.onrender.com/api/petshop')
        .then(res => res.json())
        .then(data => {

            const productos = data;

            let juguetes = productos.filter(producto => producto.categoria == 'jugueteria');
            let contenedorJuguetes = document.getElementById("contenedor-juguetes");
            let buscador = document.querySelector(".buscar-texto");

            let texto = "";
            buscador.addEventListener("keyup", (e) => {
                texto = e.target.value;
                mostarFiltro();
            })

            function mostarFiltro() {
                let filtro = [];
                if (texto != "") {
                    filtro.push(...juguetes.filter(producto => producto.producto.toLowerCase().includes((texto.toLowerCase().trim()))));
                } else  filtro.push(...juguetes);
                printCard(filtro, contenedorJuguetes);
            }
            mostarFiltro()

        })
}


