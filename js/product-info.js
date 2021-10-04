let productos=[];
let infoProducto={};
function mostrarRelacionados(array){

    let html = "";
    for(let i = 0; i< array.length;i++){
        let relacionado = array[i];
        html +=`<div><b>${productos[relacionado].name}</b>
        <p>Precio:USD${productos[relacionado].cost}</p>
        <div class="col-3">
        <img src="${productos[relacionado].imgSrc}" alt="" class="img-thumbnail">
    </div> <br> </div>`
    }

    document.getElementById("relacionados").innerHTML = html;

}








var productinfo = {};
var comentarios = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showComentsProduct() {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        comentarios = resultObj.data;

        let htmlContentToAppend = "";

        for (let i = 0; i < comentarios.length; i++) {
            let coment = comentarios[i];
            let score = coment.score;

            if (score === 3) {
                htmlContentToAppend += `
        <div  style="border:solid">
        <br>
            <div >
               <h5> ` + coment.user + `:</h5>
               <p>` + coment.dateTime + `</p>
               <p> Puntuacion:
               <span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
</p>
               <p> <FONT SIZE=4>` + coment.description + `</FONT> </p>
                
            </div>
        </div>

        <br>
        `
            } else if (score === 4) {
                htmlContentToAppend += `
        <div  style="border:solid">
        <br>
            <div >
               <h5> ` + coment.user + `:</h5>
               <p>` + coment.dateTime + `</p>
               <p> Puntuacion:
               <span class="fa fa-star checked"></span>
               <span class="fa fa-star checked"></span>
               <span class="fa fa-star checked"></span>
               <span class="fa fa-star checked"></span>
               <span class="fa fa-star"></span>
             </p>
               <p> <FONT SIZE=4>` + coment.description + `</FONT> </p>
               
            </div>
        </div>

        <br>
        `

            } else if (score === 5) {
                htmlContentToAppend += `
        <div  style="border:solid">
        <br>
            <div >
               <h5> ` + coment.user + `:</h5>
               <p>` + coment.dateTime + `</p>
               <p> Puntuacion: 
               <span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
             </p>
               <p> <FONT SIZE=4>` + coment.description + `</FONT> </p>
              
            </div>
        </div>

        <br>
        `

            }

            document.getElementById("productComents").innerHTML = htmlContentToAppend;
        }


    })
}

function enviarDatos(){
    let comentario = document.getElementById("comentario").value;
    let fecha = new Date();
    let contenedor = document.getElementById("contenedorComentarios");

    let HTMLContent = `<p>Nuevo comentario:</p>
    <div class = "border border-info m-5 p-5">
            <p>${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}</p>
            <p> <FONT SIZE=4>${comentario}</FONT></p>
        </div>`

    contenedor.innerHTML += HTMLContent;

    document.getElementById("comentario").value = "";

}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productinfo = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost");

            productNameHTML.innerHTML = productinfo.name;
            productDescriptionHTML.innerHTML = productinfo.description;
            productCountHTML.innerHTML = productinfo.soldCount;
            productCategoryHTML.innerHTML = productinfo.category;
            productCostHTML.innerHTML = productinfo.cost

            //Muestro las imagenes en forma de galería
            showImagesGallery(productinfo.images);
            getJSONData(PRODUCTS_URL).then(function(resultObj){

                productos=resultObj.data;
                mostrarRelacionados(productinfo.relatedProducts)
            })

            showComentsProduct();
        }
    });
});