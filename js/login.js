 //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.getElementById("boton").addEventListener("click",function(){



var usuario = document.getElementById("usuario");
var contraseña = document.getElementById("contraseña");

if(usuario.value == "" || contraseña.value == ""){

    alert("Ambos campos son obligatorios")
}else{
    sessionStorage.setItem("user",usuario.value);
    sessionStorage.setItem("pass",contraseña.value);
    alert("Bienvenid@ "+usuario.value);

    window.location.href="index.html"

}

})
document.addEventListener("DOMContentLoaded", function(e){

});