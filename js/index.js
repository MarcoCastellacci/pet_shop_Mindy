getAPI()
async function getAPI() {
    await fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(res => res.json())
        .then(data => {
            const productos = data.response;
            let productosMasVendidos = productos.filter(producto => producto.stock <= 5)

            let contenedorProductos = document.querySelector('.productos');
            let botonJuguete = document.querySelector(".boton-juguete");
            let botonFarma = document.querySelector(".boton-farma");
            let buscador = document.querySelector(".buscar-texto");

            let texto = "";
            buscador.addEventListener("keyup", (e) => {
                texto = e.target.value;
                mostarFiltro();
            })

            let filtroCategoria = [];
            botonJuguete.addEventListener("click", (e) => {
                if (e.target) {
                    filtroCategoria.push(e.target.id)
                    console.log(filtroCategoria);
                    mostarFiltro();
                }
            })
            botonFarma.addEventListener("click", (e) => {
                if (e.target) {
                    filtroCategoria.push(e.target.id)
                    console.log(filtroCategoria);
                    mostarFiltro();
                }
            })

            function mostarFiltro() {
                let filtro = [];
                let ultimoElem = filtroCategoria.length - 1;
                if (filtroCategoria[ultimoElem] == "Medicamento" && texto != "") {
                    filtro.push(...productosMasVendidos.filter(producto => producto.tipo == filtroCategoria[ultimoElem] && (producto.nombre.toLowerCase().includes((texto.toLowerCase().trim())))));
                } else if (filtroCategoria[ultimoElem] == "Medicamento" && texto == "") {
                    filtro.push(...productosMasVendidos.filter(producto => producto.tipo == filtroCategoria[ultimoElem] && (producto.nombre.toLowerCase().includes((texto.toLowerCase().trim())))));
                } else if (filtroCategoria.includes("Juguete") && texto != "") {
                    filtro.push(...productosMasVendidos.filter(producto => producto.tipo == filtroCategoria[ultimoElem] && (producto.nombre.toLowerCase().includes((texto.toLowerCase().trim())))));
                } else if (filtroCategoria.includes("Juguete") && texto == "") {
                    filtro.push(...productosMasVendidos.filter(producto => producto.tipo == filtroCategoria[ultimoElem] && (producto.nombre.toLowerCase().includes((texto.toLowerCase().trim())))));
                } else if (filtro.length == 0 && texto != "") {
                    filtro.push(...productosMasVendidos.filter(producto => producto.nombre.toLowerCase().includes((texto.toLowerCase().trim()))))
                } else if (filtro.length == 0) {
                    filtro.push(...productosMasVendidos);
                }
                console.log(filtro)
                printCard(filtro, contenedorProductos);
            }
            mostarFiltro()
        })
}