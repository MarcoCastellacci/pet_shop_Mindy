let data;


async function getAPI() {
    await fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(response => response.json())
        .then(json => data = json)
        .catch(error => console.error(error));

    let tablaCarrito = document.getElementById('lista-carrito');

    let juguetes = [{
            nombre: "Cuerda para morder",
            precio: 350
        },
        {
            nombre: "Frisbee de silicona",
            precio: 320
        }, {
            nombre: "Frisbee de silicona",
            precio: 320
        }, {
            nombre: "Frisbee de silicona",
            precio: 320
        }, {
            nombre: "Frisbee de silicona",
            precio: 320
        }, {
            nombre: "Frisbee de silicona",
            precio: 320
        }, {
            nombre: "Cuerda para morder",
            precio: 350
        }
    ]

    function cantidadesParaCarrito(productosCarrito) {
        let cantidad = [];
        productosCarrito.forEach(producto => {
            if (!cantidad[producto.nombre]) {
                cantidad[producto.nombre] = {
                    cantidad: 1,
                    nombre: producto.nombre,
                    precio: producto.precio,
                };
            } else {
                cantidad[producto.nombre].cantidad = cantidad[producto.nombre].cantidad + 1;
            }
        })
        return cantidad;
    }

    let cantidad = cantidadesParaCarrito(juguetes)
    console.log(cantidad);

    function mostrarCarrito(carritodecompras) {
        console.log(carritodecompras);
        let html = "";
        carritodecompras.forEach(producto => {
            let totalPorProducto = producto.cantidad * producto.precio;
            console.log(carritodecompras);
            html += `
                    <tr>
                        <td>${producto.nombre}</td>
                        <td>${producto.cantidad}</td>
                        <td>${producto.precio}</td>
                        <td>${totalPorProducto}</td>
                        <td>
                            <button class="btn btn-danger eliminar" onclick="eliminar(${producto.id})">Eliminar
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="trash bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                            </button>
                        </td>
                    </tr>
                `;

        });
        tablaCarrito.innerHTML = html;

    }
    mostrarCarrito(cantidad)

    function mostrarTotales(carritodecompras) {
        let total = 0;
        let html = "";
        carritodecompras.forEach(producto => {
            let totalPorProducto = producto.cantidad * producto.precio;
            total += totalPorProducto;
            html += `
                <p>${totalPorProducto}</p>
            `;
        })
        document.getElementById('total').innerHTML = html;
    }
    mostrarTotales(cantidad)
}
getAPI()