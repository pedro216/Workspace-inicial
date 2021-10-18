let Total = 0;
let productosCarrito = [];
let subTotal = 0;



/* Funcion que actualiza los subtotales del carrrito cuanto se modifica la cantidad de articulos presentes en el carrito,y lanza la funcion que actualiza el total*/

function updateProductoSubtotal(cantidad, costo, id) {
    document.getElementById(id).innerHTML = cantidad * costo;
    updateTotal()
}

/*funcion que inserta y muestra en el html los articulos y sus atributos presentes en el array productosCarrito que es donde se guarda la respuesta de la funcion getCarrito,y tambien inserta los elementos html donde se muestra el total a pagar*/ 
function showCarrito() {
    let index = 0;
    
    let htmlToAppend = "";
    for (let article of productosCarrito) {
        index++;
        id = index;
        if (article.currency === "USD") {


            Total += article.unitCost * 40 * article.count;
            subTotal = article.unitCost * 40 * article.count;
            htmlToAppend += `
               <tr>
               <td><img src="${article.src}" class = "img-fluid" style ="max-width:90px!important"></td>
               <td class="align-middle">${article.name}</td>
               <td class="align-middle">${article.currency} ${article.unitCost}-equivale a UYU${subTotal}</td>
               <td class="align-middle"><input type="number" style="width:100px" min ="1" value=${article.count} onchange="updateProductoSubtotal(this.value,${subTotal},${id})" ></td>
               <td id="${id}" class="subtotal align-middle">${subTotal} </td>
               </tr>`

        } else {
            Total += article.unitCost * article.count;
            subTotal = article.unitCost * article.count;
            htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:90px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle">${article.currency} ${article.unitCost}</td>
        <td class="align-middle"><input type="number" style="width:100px" min ="1" value=${article.count} onchange="updateProductoSubtotal(this.value,${article.unitCost},${id})" ></td>
        <td id="${id}" class="subtotal align-middle">${subTotal} </td>
        </tr>`

        }



    }

    htmlToAppend += ` <div>
    <thead>
        <tr>
          <th scope="col"></th> 
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col">Total: $</th>
          <th id="total" scope="col" >$</th>
        </tr>
      </thead>
    </div> `
    document.getElementById("carrito").innerHTML = htmlToAppend;


}



function getCarrito(url) {

    return fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })

}
document.addEventListener("DOMContentLoaded", function (e) {
    getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
        .then(respuesta => {
            productosCarrito = respuesta.articles;
            showCarrito();
            updateTotal();
            console.log(productosCarrito);
        })
});

/*Funcion que busca los subtotales gracias a su clase los suma(calcula el total) y lo inserta en el elemtno html creado anteriormente con la id total,esto cada vez que se modifica un subtotal */
function updateTotal() {

    Total = 0;
    let subtotales = document.getElementsByClassName("subtotal");
    for (let iterator of subtotales) {
        Total += parseInt(iterator.innerHTML);
    }
    document.getElementById("total").innerHTML = Total + "$"
}