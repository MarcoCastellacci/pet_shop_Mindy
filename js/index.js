getAPI()
async function getAPI() {
    await fetch('https://mindhub-xj03.onrender.com/api/petshop')
        .then(res => res.json())
        .then(data => {
            const productos = data;
            let productosMasVendidos = productos.filter(producto => producto.disponibles <= 3)

            let contenedorProductos = document.querySelector('.productos');
            let botonJuguete = document.querySelector(".boton-juguete");
            let botonFarma = document.querySelector(".boton-farma");
            let buscador = document.querySelector(".buscar-texto");

            let texto = "";
            buscador.addEventListener("keyup", (e) => {
                texto = e.target.value;
                filtroCategoria.splice(0, filtroCategoria.length); // Vaciar el array de categorías
                mostrarFiltro();
            });

            let eventosConfigurados = false; // Flag para verificar si los eventos de clic ya se han configurado
            let filtroCategoria = [];


            botonJuguete.addEventListener("click", (e) => {
                if (e.target) {
                    console.log(e.target.id);
                    if (!filtroCategoria.includes(e.target.id) || filtroCategoria.length > 0) {
                        filtroCategoria.pop();
                        filtroCategoria.push(e.target.id);
                    }
                    mostrarFiltro();
                }
            });

            botonFarma.addEventListener("click", (e) => {
                if (e.target) {
                    console.log(e.target.id);
                    if (!filtroCategoria.includes(e.target.id)|| filtroCategoria.length > 0) {
                        filtroCategoria.pop();
                        filtroCategoria.push(e.target.id);
                    }
                    mostrarFiltro();
                }
            });

            buscador.addEventListener("keyup", (e) => {
                texto = e.target.value;
                filtroCategoria = []; // Vaciar el array de categorías al realizar una búsqueda
                mostrarFiltro();
            });

            // botonJuguete.addEventListener("click", (e) => {
            //     if (e.target) {
            //         console.log(e.target.id);
            //         filtroCategoria.push(e.target.id)
            //         mostrarFiltro();
            //     }
            // })
            // botonFarma.addEventListener("click", (e) => {
            //     if (e.target) {
            //         console.log(e.target.id);
            //         filtroCategoria.push(e.target.id)
            //         mostrarFiltro();
            //     }
            // })

            function mostrarFiltro() {
                let filtro = productosMasVendidos;
                console.log(filtroCategoria);
                if (filtroCategoria.includes("Medicamento")) {
                    filtro = filtro.filter(producto => producto.categoria === "farmacia");
                }
                if (filtroCategoria.includes("Juguete")) {
                    filtro = filtro.filter(producto => producto.categoria === "jugueteria");
                }
                if (texto.trim() !== "") {
                    filtro = filtro.filter(producto => producto.producto.toLowerCase().includes(texto.toLowerCase().trim()));
                }
                console.log(filtro);
                printCard(filtro, contenedorProductos);
            }
            mostrarFiltro()
        })
}