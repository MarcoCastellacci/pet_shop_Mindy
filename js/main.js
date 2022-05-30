
function printCard(array, node) {

    node.innerHTML = '';

    array.forEach(producto => {

        node.innerHTML += `
                        <div class="card col-4" style="width: 18rem;">
                            <span class="stock">ultimas unidades</span>              
                            <a href="detalles.html?id=${producto._id}">
                                <img class="img-card"  
                                    src="${producto.imagen}">
                            </a>
                
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title font-weight-bold">${producto.nombre}</h5>
                                <p class="card-text contenedor-parrafo" style="margin-top: auto;">${producto.descripcion}</p>
                
                                <div class="text-center" style="margin-top: auto;">
                                    <p class="card-text mb-1 fs-5">$${producto.precio}</p>
                                    <a href="carrito.html?id=${producto._id}" class="btn btn-naranja mt-3">Agregar al carrito</a>
                                </div>
                            </div>
                        </div>`


    })

}