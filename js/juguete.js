getAPI()
async function getAPI() {
    await fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(res => res.json())
        .then(data => {

            const productos = data.response;

            let juguetes = productos.filter(producto => producto.tipo == 'Juguete');
            let contenedorJuguetes = document.getElementById("contenedor-juguetes");
            let buscador = document.querySelector(".buscar-texto");

            let texto = "";
            buscador.addEventListener("keyup", (e) => {
                texto = e.target.value;
                mostarFiltro();
            })

            function mostarFiltro() {
                let filtro = [];
                // let ultimoElem = filtroCategoria.length - 1;
                if (texto != "") {
                    filtro.push(...juguetes.filter(producto => producto.nombre.toLowerCase().includes((texto.toLowerCase().trim()))));
                } else filtro.push(...juguetes);

                printCard(filtro, contenedorJuguetes);
            }
            mostarFiltro()

        })
}