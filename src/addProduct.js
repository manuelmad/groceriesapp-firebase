import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "./firebase.js";
import { productsArray } from "./index.js";

const modal_container = document.querySelector(".add-modal");

// Event to show add new product modal
const add_product_btn = document.getElementById("add_product_btn");
add_product_btn.addEventListener("click", ()=> {
    modal_container.style.display = "flex";
});

// Event to hide add new product modal
const new_product_cancel = document.getElementById("new_product_cancel");
new_product_cancel.addEventListener("click", ()=> {
    modal_container.style.display = "none";
});


const new_product_btn = document.getElementById("new_product_btn");
const new_product_name = document.getElementById("new_product_name");
const new_product_measurement = document.getElementById("new_product_measurement");
const new_product_quantity = document.getElementById("new_product_quantity");

// Event to add a new product to database
new_product_btn.addEventListener("click", async ()=> {
    let newName = new_product_name.value;
    let newMeasurement = new_product_measurement.value;
    let newQuantity = new_product_quantity.value;

    // If nameless product, stop the process
    if(newName == "") {
        alert(`Por favor, escriba un nombre para el producto.`);
        return;
    }

    // If product already exists, stop process
    let productExist = productsArray.find(item => item.name == newName);

    if(productExist) {
        alert(`El producto "${newName}" ya existe en la base de datos.`);
        return;
    }

    // Add product to database
    await setDoc(doc(db, 'products', newName), {
        name: newName,
        measurement: newMeasurement,
        quantity: Number(newQuantity)
    });

    // Close modal
    modal_container.style.display = "none";
});