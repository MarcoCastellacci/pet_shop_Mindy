var nombreYApellido=document.querySelector("#exampleInputNombre")
const alertanombreYApellido=document.querySelector("#alertaNombre1")
var datoNombre = ""
nombreYApellido.addEventListener("keyup", (event)=>{

    var dato = event.target.value
    console.log(dato)
    var correctNombre=dato.trim()
    .toLowerCase() 
    .split(" ")
    .filter(Boolean) 
    .map(palabra=>palabra[0].toUpperCase()+palabra.substr(1)) 
    .join(" ") 
    if(dato.length<4){
        alertanombreYApellido.innerHTML="Debe ingresar como minimo 4 caracteres"
        alertanombreYApellido.style.color="grey"
    }else{
        alertanombreYApellido.innerHTML ="Tu nombre es " +correctNombre;
    } 
    datoNombre=correctNombre
} )

 
var telefono=document.querySelector("#exampleInputTelefono")
const alertaTelefono=document.querySelector("#alertatelefono")
var datoTelefono = ""
telefono.addEventListener("change", (event)=>{

    var dato=event.target.value;
    var datoTel= dato.trim() 
    .split("") 
    .filter(Number)
    .join(" ")
if(datoTel.length<10){
    alertaTelefono.innerHTML="Chequee bien su numero"
    alertaTelefono.style.color="grey"
}else{
    alertaTelefono.innerHTML ="Tu numero es " +datoTel;}
    alertaTelefono.style.color="grey"
 datoTelefono=datoTel
})

var check1=document.querySelector("#checkPerro")
var check2=document.querySelector("#checkGato")
var check3=document.querySelector("#checkOtros")
const alertaCheck=document.querySelector("#checkbox")
var checkboxA=""
check1.addEventListener("click", capturaCheck)
check2.addEventListener("click", capturaCheck)
check3.addEventListener("click", capturaCheck)
function capturaCheck(event){
    var dato=event.target.value
    let datoMascotas=dato
    if(datoMascotas !== ""){
        alertaCheck.innerHTML="Su mascota es: "+datoMascotas
        alertaCheck.style.color="grey"
    }else{
        alertaCheck.innerHTML="Debe seleccionar una opcion"
        alertaCheck.style.color="grey"
    }
    checkboxA=dato
    }
    


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
tempo = setTimeout(borrarForm, 3000)
}

function borrarForm(){ 
    document.getElementById("imprimir").style.visibility="hidden"
    document.getElementById("form").reset();

    } 


    
