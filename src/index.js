import { collection, onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import { db } from "./firebase.js";

// Get the collection 'products'
const productsCollection = await collection(db, 'products');

// Accesging elements on html
const shores_list = document.getElementById('shores_list');
const div = document.querySelector('.quantity-modal');
const selection_list = document.getElementById("selection_list");

const x_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
</svg>`;

//let currentProduct;
let productsArray = [];

// Listen to the current collection and get changes everytime a document is updated, created or deleted
onSnapshot(productsCollection, (snapshot)=>{
	addProductsToList(snapshot.docs);
});

function addProductsToList(data) {
	// Clean the list ul, array of products and the showed list
	selection_list.innerHTML = "";
	productsArray = [];
	shores_list.innerHTML = "";

	data.forEach(item => {
		const product = item.data();
		console.log(product["name"]);

		productsArray.push(product);

		let option = document.createElement('option');
		option.innerText = product["name"];
		option.value = product["name"];

		shores_list.appendChild(option);

		// Show only products with quantity > 0
		if(product["quantity"] > 0) {
			let li = document.createElement("li");
			li.innerHTML = `<span class="red-font">${product["quantity"]}</span><span>${product["measurement"]} de ${product["name"].toLowerCase()}.</span>`;

			let span_x = document.createElement('span');
			span_x.setAttribute('class', 'x-button__container');
			span_x.innerHTML = x_icon;

			span_x.addEventListener('click', async ()=> {
				// Asign the product to delete
				let productToDelete = productsArray.find(item => item["name"] == option.innerText);
				console.log(productToDelete);

				// Give 0 to quantity so the database is updated and this product no longer will be visible
				await updateDoc(doc(db, 'products', productToDelete["name"]), {
					quantity: 0
				});
			});

			li.appendChild(span_x);
			selection_list.appendChild(li);
		}
	});

	console.log(productsArray);

}

// Event so the update/add modal is shown
shores_list.addEventListener('change', (event)=> {
	const currentValue = event.target.value;

	// console.log(value);
	div.innerHTML = "";

	let div2 = document.createElement('div');

	let p = document.createElement('p');
	p.innerHTML = `Por favor, indique la cantidad de <span>${currentValue}</span> que desea comprar:</br>`;

	let p2 = document.createElement('p');

	let input = document.createElement('input');
	input.setAttribute('type', 'number');

	let span = document.createElement('span');
	span.innerHTML = `${productsArray.find(item => item.name == currentValue)["measurement"]}.`;

	let button = document.createElement('button');
	button.innerText = "Añadir";

	button.addEventListener('click', async ()=> {
		let quantity = input.value;

		if(quantity == 0) {
			alert("Por favor, introduzca una cantidad.");
			return;
		}

		// Asign the product to update
		let productToUpdate = productsArray.find(item => item["name"] == currentValue);
		console.log(productToUpdate);

		// Give a new value to quantity so the database is updated
		await updateDoc(doc(db, 'products', productToUpdate["name"]), {
			quantity: quantity
		});

		div.style.display = "none";
	});

	let button_cancel = document.createElement('button');
	button_cancel.innerText = "Cancelar";

	button_cancel.addEventListener('click', ()=> {
		div.style.display = "none";
	});

	p2.appendChild(input);
	p2.appendChild(span);
	p2.appendChild(button);
	p2.appendChild(button_cancel);
	div2.appendChild(p);
	div2.appendChild(p2);
	div.appendChild(div2);

	div.style.display = "block";
});