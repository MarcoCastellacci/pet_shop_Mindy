var button=document.querySelector("#finalizar")

button.addEventListener("click",(e)=>{
    e.preventDefault()
var mensaje=""
mensaje+=`
<div id="mensajeForm" class="alert alert-sucess mensajeForm" class="slide">
<h4 class="mensajeContacto">Gracias por escribirnos</h4>
<h5 class="mensajeContacto">Nos pondremos en contacto pronto</h5>
</div>
`
document.querySelector("#imprimir").innerHTML=mensaje

temporizador()
})
var tempo;
function temporizador(){
tempo = setTimeout(borrarForm, 2000)
}

function borrarForm(){ 
    document.getElementById("imprimir").style.visibility="hidden"
    document.getElementById("form").reset();

    } 


