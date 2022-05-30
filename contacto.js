var botton=document.querySelector("#finalizar")
function mostrarCartel(){
    botton.addEventListener("click", (event)=>{
        event.preventDefault()
     var cartel=""
     
     cartel+=`<div id="mensajeForm" class="alert alert-sucess mensajeForm">
     <h4 class="mensajeContacto">Gracias por escribirnos</h4>
     <h5 class="mensajeContacto">Nos pondremos en contacto pronto</h5>
   </div>
   `
  document.querySelector("#imprimir").createElement(cartel)
} )
}
mostrarCartel()

 /*  function mostrarCartel(){
var cartelEliminado=document.querySelector("#mensajeForm")
cartelEliminado.delay(4000).slideUp(1000, () => {
    cartelEliminado.remove()
    borrarForm()
})
   
  
}
mostrarCartel()

function borrarForm() {
    document.getElementById("#form").reset()
} */


/* $("#finalizar").on("click", () => {
    event.preventDefault()

    $("#imprimir").append(`<div id="mensajeForm" class="alert alert-sucess mensajeForm">
    <h4 class="mensajeContacto">Gracias por escribirnos</h4>
    <h5 class="mensajeContacto">Nos pondremos en contacto pronto</h5>
  </div>
  `)

    $("#mensajeForm").delay(4000).slideUp(1000, () => {
        $("#mensajeForm").remove()
        borrarForm()
    })
})
 */

