getAPI()
async function getAPI() {
    await fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(res => res.json())
        .then(data => {

            const productos = data.response;
            let producto = productos.filter(producto => producto.tipo);

            let categorias = productos.map(producto => producto.tipo);

            const contenedorProductos = document.querySelector('.index-productos');

            

            printCard(producto, contenedorProductos);

            console.log(categorias) 
            let categoria = new Set(categorias);
            let categ = Array.from(categoria);
            console.log(categ);
            let contenedorCategorias = document.querySelector(".cont-categorias");

            function imprimirCategorias(array) {
                let filtro = "";
                array.forEach(categoria => {
                    filtro += `<button>${categoria}</button>`
                    contenedorCategorias.innerHTML = filtro;
                })
            }
            imprimirCategorias(categ)
        })
    }
    