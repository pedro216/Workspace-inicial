/*funcion que crea el objeto usuario y define los nombres de sus campos y los valores de ellos, que los obiene atravez de la id de los inputs.
Dejando al objeto ahora escrito tipo script, guardado en localstorage bajo la key user,para poder cargarlo mas adelante */ 

function setUser(){
let usuario={};

usuario.nombre =  document.getElementById("inputNombre").value
usuario.apellido = document.getElementById("inputApellido").value
usuario.email = document.getElementById("inputEmail").value
usuario.telefono = document.getElementById("inputContacto").value

localStorage.setItem("user",JSON.stringify(usuario));




}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//una vez todos los elementos presentes
//obtenemos el objeto guardado en el localstorage bajo la key user y lo convertimos de tipo string a tipo objeto, para poder llamarlo por sus valores individuales
//luego a cada input, por su id, les setea los valores ingresados por el usuario

document.addEventListener("DOMContentLoaded", function (e) {

let datosTexto = localStorage.getItem("user");
let datosRegistro = JSON.parse(datosTexto);
console.log(datosRegistro);
document.getElementById("inputNombre").value = datosRegistro.nombre
document.getElementById("inputApellido").value = datosRegistro.apellido
document.getElementById("inputEmail").value = datosRegistro.email
document.getElementById("inputContacto").value = datosRegistro.telefono
});

