let Total = 0;
let productosCarrito=[];
let subTotal= 0;





function updateProductoSubtotal(cantidad,costo,id){
    document.getElementById(id).innerHTML=cantidad*costo;
    updateTotal()
}


function showCarrito(){
    let index = 0;
    /*mostrar los productos del carrito con el input correspondiente a la cantidad*/
    let htmlToAppend = "";
    for(let article of productosCarrito){
        index++;
        id=index;
        if(article.currency==="USD"){
            

            Total+=article.unitCost*40*article.count;
            subTotal= article.unitCost*40*article.count;
               htmlToAppend += `
               <tr>
               <td><img src="${article.src}" class = "img-fluid" style ="max-width:90px!important"></td>
               <td class="align-middle">${article.name}</td>
               <td class="align-middle">${article.currency} ${article.unitCost}-equivale a UYU${subTotal}</td>
               <td class="align-middle"><input type="number" style="width:100px" min ="1" value=${article.count} onchange="updateProductoSubtotal(this.value,${subTotal},${id})" ></td>
               <td id="${id}" class="subtotal align-middle">${subTotal} </td>
               </tr>`

        }else{
        Total+=article.unitCost*article.count;
     subTotal= article.unitCost*article.count;
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



function getCarrito(url){
    
    return fetch(url)
    .then(respuesta=>{
        return respuesta.json();
    })
    
}
document.addEventListener("DOMContentLoaded", function(e){
    getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
    .then(respuesta=>{
        productosCarrito = respuesta.articles;
        showCarrito();
        updateTotal();
        console.log(productosCarrito);
    })
});


function updateTotal(){

  Total=0;
  let subtotales = document.getElementsByClassName("subtotal");
  for (let iterator of subtotales){
         Total+=parseInt(iterator.innerHTML);
  }
  document.getElementById("total").innerHTML=Total+"$"
}