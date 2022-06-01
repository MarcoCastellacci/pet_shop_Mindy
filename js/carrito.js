let data;
async function getAPI() {
    await fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(response => response.json())
        .then(json => data = json)
        .catch(error => console.error(error));

    let tablaCarrito = document.getElementById('lista-carrito');
    console.log(data);

    function cantidadesParaCarrito(productosCarrito) {
        let cantidad = [];
        productosCarrito.forEach(producto => {
            if (!cantidad[producto.nombre]) {
                cantidad[producto.nombre] = {
                    cantidad: 1,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    id: producto._id
                };
            } else {
                cantidad[producto.nombre].cantidad = cantidad[producto.nombre].cantidad + 1;
            }
        })
        return cantidad;
    }

    let cantidad = cantidadesParaCarrito(data.response);
    console.log(cantidad);

    function mostrarCarrito(carritodecompras, tablaCarrito) {
        tablaCarrito.innerHTML = "";
        carritodecompras.forEach(producto => {
            tablaCarrito.innerHTML +=
                `<div class="card col-4" style="width: 18rem;">              
                            <a href="detalles.html?id=${producto._id}">
                                <img class="img-card"  
                                    src="${producto.imagen}"> </a>           
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title font-weight-bold">${producto.nombre}</h5>
                                <p class="card-text contenedor-parrafo" style="margin-top: auto;">${producto.descripcion}</p>        
                                <div class="text-center" style="margin-top: auto;">
                                    <p class="card-text mb-1 fs-5 precio">$${producto.precio}</p>
                                    <a href="#" class="btn btn-naranja mt-3" onclick="agregarProducto('${producto._id}')">Agregar al carrito</a>
                                </div>
                            </div>
                        </div>`;
        })
    }
    console.log(cantidad, tablaCarrito);
    mostrarCarrito(cantidad, tablaCarrito)


    function mostrarTotales(carritodecompras) {
        let total = 0;
        let html = "";
        carritodecompras.forEach(producto => {
            let totalPorProducto = producto.cantidad * producto.precio;
            total += totalPorProducto;
            html += ` <p> ${total}</p>`;
        })

        document.getElementById('total').innerHTML = html;
    }
    mostrarTotales(cantidad)
}
getAPI()