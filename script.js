let navbar = document.querySelector(".navbar")

document.querySelector("#menu-btn").onclick = () =>{
    navbar.classList.toggle("active");
    searchForm.classList.remove("active");
    cartItem.classList.remove("active");
}

let  cartItem= document.querySelector(".cart-items-container")

document.querySelector("#cart-btn").onclick = () =>{
    cartItem.classList.toggle("active");
    navbar.classList.remove("active");
    searchForm.classList.remove("active");
}

let  searchForm= document.querySelector(".search-form")

document.querySelector("#search-btn").onclick = () =>{
    searchForm.classList.toggle("active");
    navbar.classList.remove("active");
    cartItem.classList.remove("active");
}

window.onscroll = () =>{
    navbar.classList.remove("active");
    searchForm.classList.remove("active");
    cartItem.classList.remove("active");
}

function loader(){
    document.querySelector(".loader-container").classList.add("fade-out");
}

function fadeOut(){
    setInterval(loader, 3000)
}

window.addEventListener("load", fadeOut);


const products = document.querySelector("#listProducts");
const contentProducts = document.querySelector("#contentProducts");

let productsArray = [];

document.addEventListener("DOMContentLoaded", function() {
    eventListeners();
})

function eventListeners() {
    products.addEventListener("click", getDataElements);
}

function updateCartCount () {
    const cartCount = document.querySelector("#cartCount");
    cartCount.textContent = productsArray.length;
}

function updateTotal() {
    const total = document.querySelector("#total");
    let totalProduct = productsArray.reduce((total, prod) => total + prod.price * prod.quantity, 0);
    total.textContent = `$${totalProduct.toFixed(2)}`;
}

function getDataElements(e) {
    if (e.target.classList.contains("btn")) {
        const elementHtml = e.target.closest(".box");
        selectData(elementHtml);
    }
}

function selectData(prod) {
    const productObj = {
        img: prod.querySelector("img").src,
        title: prod.querySelector("h3").textContent,
        price: parseFloat(prod.querySelector(".price").textContent.replace("$", "")),
        id: parseInt(prod.querySelector('button[type="button"]').dataset.id, 10),
        quantity: 1
    }

    const exists = productsArray.some(prod => prod.id === productObj.id);


    if (exists) {
        showAlert("El producto ya existe en el carrito", "error");
        return;
    }

    productsArray = [...productsArray, productObj]
    showAlert("Producto Agregado Exitosamente", "success");
    productsHtml();
    updateCartCount();
    updateTotal();
}





function productsHtml() {
    cleanHtml();
    productsArray.forEach(prod => {
        const { img, title, price, quantity, id } = prod;

        const tr = document.createElement("tr");


        const tdImg = document.createElement("td");
        const prodImg = document.createElement("img");

        prodImg.src = img;
        prodImg.alt = "image product"
        tdImg.appendChild(prodImg);


        const tdTitle = document.createElement("td");
        const prodTtile = document.createElement("p")
        prodTtile.textContent = title;
        tdTitle.appendChild(prodTtile);
        
        const tdPrice = document.createElement("td");
        const prodPrice = document.createElement("p")
        prodPrice.textContent = `$${price.toFixed(2)}`;
        tdPrice.appendChild(prodPrice);

        const tdQuantity = document.createElement("td");
        const prodQuantity = document.createElement("input");
        prodQuantity.type = "number";
        prodQuantity.min = "1";
        prodQuantity.value = quantity;
        prodQuantity.dataset.id = id;
        tdQuantity.appendChild(prodQuantity);



        const tdDelete = document.createElement("td");
        const prodDelete = document.createElement("button");
        prodDelete.type = "button";
        prodDelete.textContent = "X";
        prodDelete.onclick = () => destroyProduct(id);
        tdDelete.appendChild(prodDelete);


        
        tr.append(tdImg, tdTitle, tdPrice, tdQuantity, tdDelete);

        contentProducts.appendChild(tr)

    });
}

function destroyProduct(idProd) {
   productsArray = productsArray.filter(prod => prod.id !== idProd);
   showAlert("Producto Removido Exitosamente", "success");
   productsHtml();
   updateCartCount();
   updateTotal();
}





function cleanHtml() {
    contentProducts.innerHTML = "";
}

function showAlert(message, type) { 
    const nonRepeatAlert = document.querySelector(".alert");
    if(nonRepeatAlert) nonRepeatAlert.remove();

    const container = document.querySelector("#listProducts"); 
    const div = document.createElement("div");
    div.classList.add("alert", type);
    div.textContent = message;


    
    container.appendChild(div);

    setTimeout(() => div.remove(), 5000);
        
}
 
