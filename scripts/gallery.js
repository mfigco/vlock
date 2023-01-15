
const left_button = document.querySelector(".scroll-button-left");
const right_button = document.querySelector(".scroll-button-right");
let control = document.querySelector(".gallery-controls");
let control_buttons = control.children;
const panes = document.querySelector(".gallery").children;
const count = panes.length;
let products;
let page = -1;
let reverse = false;
products = [
	{
		"Artista": "Artista",
		"Nombre": "Nombre",
		"Precio": "0.09",
		"Imagen": "media/red.png"
	},
	{
		"Artista": "Artista",
		"Nombre": "Nombre",
		"Precio": "0.09",
		"Imagen": "media/blue.png"
	},
	{
		"Artista": "Artista",
		"Nombre": "Nombre",
		"Precio": "0.09",
		"Imagen": "media/green.png"
	},
	{
		"Artista": "Artista",
		"Nombre": "Nombre",
		"Precio": "0.09",
		"Imagen": "media/green.png"
	},
	{
		"Artista": "Artista",
		"Nombre": "Nombre",
		"Precio": "0.09",
		"Imagen": "media/red.png"
	},
	{
		"Artista": "Artista",
		"Nombre": "Nombre",
		"Precio": "0.09",
		"Imagen": "media/blue.png"
	},
	{
		"Artista": "Artista",
		"Nombre": "Nombre",
		"Precio": "0.09",
		"Imagen": "media/blue.png"
	},
	{
		"Artista": "Artista",
		"Nombre": "Nombre",
		"Precio": "0.09",
		"Imagen": "media/red.png"
	},
]
/*let request = new XMLHttpRequest();
request.open("GET", "scripts/products.json");
request.responseType = "json";
request.send();
request.onload = function(){
  products = request.response();
}*/
const length = products.length;
setControls();
scroll();

for(let i = 0; i < control_buttons.length; i++){
	if (control_buttons[i].isEqualNode(left_button) || control_buttons[i].isEqualNode(right_button)){
		continue;
	}
	control_buttons[i].setAttribute("number", (i - 1));
	control_buttons[i].addEventListener("click", function(evt){
		page = evt.target.getAttribute("number");
		for (let element of control_buttons){
			element.style.color = "gray";
		}
		evt.target.style.color = "#f4364c";
		changePage();
	})
}

left_button.addEventListener("click", function(){
  reverse = true;
  scroll();
});
right_button.addEventListener("click", function(){
  reverse = false;
  scroll();
});

function scroll(){
  if (reverse){
    page--;
    if (page < 0){
      page = length % count == 0 ? (length / count) - 1 : Math.trunc(length / count);
    }
  }
  else{
    page++;
    if (page * count >= products.length){
      page = 0;
    }
  }
  for (let element of control_buttons){
	element.style.color = "gray";
  }
  control_buttons[page + 1].style.color = "#f4364c";
  changePage();
}

function changePage(){
	let child, product;
	for (let i = 0; i < count; i++) {
		product = products[page * count + i];
		if (product == null){
			panes[i].style.visibility = "hidden";
		}
		else{
			panes[i].style.visibility = "visible";
			child = panes[i].children;
			child[0].children[0].src = product["Imagen"];
			child[1].textContent = product["Artista"];
			child[2].textContent = product["Nombre"];
			child[3].childNodes[1].textContent = product["Precio"];
		}
  	}
}

function setControls(){
	let page_number = length % count == 0 ? (length / count) - 1 : Math.trunc(length / count);
	for (let i = 1; i < (length / count); i++) {
		control.insertBefore(control_buttons[1].cloneNode(true), right_button);
	}
}