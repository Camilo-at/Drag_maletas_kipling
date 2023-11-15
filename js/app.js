let items = document.querySelectorAll(".list-drag-drop");
const contenedorMaleta = document.querySelector(".suitcase-container");
const contenedorLista = document.querySelector(".suitcase-infos-container");
const maletaImg = document.getElementById("suitcase-img");
const alertaTexto = document.querySelector(".alert-text");

let altoMaleta = 67.5;
let anchoMaleta = 46.5;
let profundidadMaleta = 28;

let volumenMaleta = altoMaleta * anchoMaleta * profundidadMaleta;
console.log("volumen maleta", volumenMaleta);
let pesoLimite = 3.51;
console.log("Peso maleta", volumenMaleta);
let espacioOcupado = 0;
let pesoOcupado = 0;

let productos = 0;


contenedorLista.addEventListener("dragstart", (e) => {
    const elementoArrastrado = e.target;

    const anchoProducto = parseFloat(elementoArrastrado.dataset.ancho);
    const altoProducto = parseFloat(elementoArrastrado.dataset.alto);
    const profundidadProducto = parseFloat(elementoArrastrado.dataset.profundidad);
    const pesoProducto = parseFloat(elementoArrastrado.dataset.peso);

    const dataTransfer = e.dataTransfer;
    dataTransfer.setData("ancho", anchoProducto.toString());
    dataTransfer.setData("alto", altoProducto.toString());
    dataTransfer.setData("profundidad", profundidadProducto.toString());
    dataTransfer.setData("peso", pesoProducto.toString());

    e.dataTransfer.setData("id", e.target.id);
});

contenedorMaleta.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.target.classList.add("hover");
});

contenedorMaleta.addEventListener("dragleave", (e) => {
    e.target.classList.remove("hover");
});


contenedorMaleta.addEventListener("drop", (e) => {
    e.target.classList.remove("hover");


    const dataTransfer = e.dataTransfer;
    const anchoProducto = parseFloat(dataTransfer.getData("ancho"));
    const altoProducto = parseFloat(dataTransfer.getData("alto"));
    const profundidadProducto = parseFloat(dataTransfer.getData("profundidad"));
    const pesoProducto = parseFloat(dataTransfer.getData("peso"));

    let volumenProducto = anchoProducto * altoProducto * profundidadProducto;
    
    if(espacioOcupado + volumenProducto >= volumenMaleta && pesoOcupado + pesoProducto >= pesoLimite) {
        alertaTexto.textContent = "La maleta está llena en términos de tamaño(volumen) y peso. Debes de quitar algunos productos antes de agregar más";
        maletaImg.src="https://kiplingco.vteximg.com.br/arquivos/ids/187356/Maleta-Peque%C3%B1a-Para-Mujer-Parker-S26.jpg?v=638280872205400000";
        console.log("volumen total ocupado", espacioOcupado);
        return;
    }
    
    if (espacioOcupado + volumenProducto >= volumenMaleta) {
        alertaTexto.textContent = "La maleta está llena en términos de tamaño(volumen). Debes quitar algunos productos o agregar productos más pequeños.";
        maletaImg.src="https://kiplingco.vteximg.com.br/arquivos/ids/187356/Maleta-Peque%C3%B1a-Para-Mujer-Parker-S26.jpg?v=638280872205400000";
        console.log("volumen total ocupado", espacioOcupado);
        return;
    }

    if(pesoOcupado + pesoProducto >= pesoLimite) {
        alertaTexto.textContent = "La maleta está llena en términos de peso. Debes quitar algunos productos o agregar un producto con menor peso.";
        maletaImg.src="https://kiplingco.vteximg.com.br/arquivos/ids/187356/Maleta-Peque%C3%B1a-Para-Mujer-Parker-S26.jpg?v=638280872205400000";
        console.log("peso total ocupado",pesoOcupado);
        return;
    }

    if(altoProducto >= altoMaleta) {
        alertaTexto.textContent = "El producto es más alto que la maleta";
        return;
    }

    if(anchoProducto >= anchoMaleta) {
        alertaTexto.textContent = "El producto es más ancho que la maleta";
        return;
    }
    
    espacioOcupado += volumenProducto;
    console.log("volumen cada producto agregado", espacioOcupado);

    pesoOcupado += pesoProducto;
    console.log("Peso cada producto agregado", pesoOcupado);

    const id = e.dataTransfer.getData("id");
    contenedorMaleta.appendChild(document.getElementById(id));

    productos ++;
    alertaProductos(productos);
});

//devolver productos
contenedorLista.addEventListener("dragleave", (e) => {
    e.target.classList.remove("hover");
});

contenedorMaleta.addEventListener("click", (e) => {
    if (e.target.classList.contains("list-drag-drop")) {
        const productoSeleccionado = e.target;

        const anchoProducto = parseFloat(productoSeleccionado.dataset.ancho);
        const altoProducto = parseFloat(productoSeleccionado.dataset.alto);
        const profundidadProducto = parseFloat(productoSeleccionado.dataset.profundidad);
        const pesoProducto = parseFloat(productoSeleccionado.dataset.peso);

        const volumenProducto = anchoProducto * altoProducto * profundidadProducto;

        if(pesoOcupado <= 0 && espacioOcupado <= 0){
            pesoOcupado = 0;
            espacioOcupado = 0;
        };

        espacioOcupado -= volumenProducto;
        pesoOcupado -= pesoProducto;

        maletaImg.src="https://kiplingco.vteximg.com.br/arquivos/ids/187355/Maleta-Peque%C3%B1a-Para-Mujer-Parker-S25.jpg?v=638280872201730000";

        alertaTexto.textContent = "Puedes agregar productos a la maleta";

        contenedorLista.appendChild(productoSeleccionado);
    };

    productos --
});



function alertaProductos(productos) {
    const contenedorAlerta = document.querySelector(".container-list-suitcases");

    if(productos) {
        const alerta = document.createElement("P");
        alerta.textContent = "Puedes sacar productos de la maleta con un click";
        contenedorAlerta.appendChild(alerta);

        if(contenedorAlerta.firstChild) {
            contenedorAlerta.removeChild(contenedorAlerta.firstChild)
        }
    }
}

/*
let items = document.querySelectorAll(".list-drag-drop");
const contenedorMaleta = document.querySelector(".suitcase-container");
const contenedorLista = document.querySelector(".suitcase-infos-container");
const maletaImg = document.getElementById("suitcase-img");

let volumenMaleta = 56 * 35.5 * 23;
console.log("volumen maleta", volumenMaleta);
let pesoLimite = 2.83;
console.log("Peso maleta", volumenMaleta);
let espacioOcupado = 0;
let pesoOcupado = 0;


contenedorLista.addEventListener("dragstart", (e) => {
    const elementoArrastrado = e.target;

    const anchoProducto = parseFloat(elementoArrastrado.dataset.ancho);
    const altoProducto = parseFloat(elementoArrastrado.dataset.alto);
    const profundidadProducto = parseFloat(elementoArrastrado.dataset.profundidad);
    const pesoProducto = parseFloat(elementoArrastrado.dataset.peso);

    const dataTransfer = e.dataTransfer;
    dataTransfer.setData("ancho", anchoProducto.toString());
    dataTransfer.setData("alto", altoProducto.toString());
    dataTransfer.setData("profundidad", profundidadProducto.toString());
    dataTransfer.setData("peso", pesoProducto.toString());

    const imagenProducto = elementoArrastrado.querySelector("img");
    const imagenSrc = imagenProducto.src;

    e.dataTransfer.setData("id", imagenSrc);
});

contenedorMaleta.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.target.classList.add("hover");
});

contenedorMaleta.addEventListener("dragleave", (e) => {
    e.target.classList.remove("hover");
});

contenedorMaleta.addEventListener("drop", (e) => {
    e.target.classList.remove("hover");

    const dataTransfer = e.dataTransfer;
    const anchoProducto = parseFloat(dataTransfer.getData("ancho"));
    const altoProducto = parseFloat(dataTransfer.getData("alto"));
    const profundidadProducto = parseFloat(dataTransfer.getData("profundidad"));
    const pesoProducto = parseFloat(dataTransfer.getData("peso"));

    let volumenProducto = anchoProducto * altoProducto * profundidadProducto;
    
    
    if (espacioOcupado + volumenProducto >= volumenMaleta) {
        alert("La maleta está llena en términos de tamaño(volumen). Debes quitar algunos productos antes de agregar más.")
        maletaImg.src="https://kiplingco.vteximg.com.br/arquivos/ids/187356/Maleta-Peque%C3%B1a-Para-Mujer-Parker-S26.jpg?v=638280872205400000";
        console.log("volumen total ocupado", espacioOcupado);
        return;
    }

    if(pesoOcupado + pesoProducto >= pesoLimite) {
        alert("La maleta está llena en términos de peso. Debes quitar algunos productos antes de agregar más o agregar un producto con menor peso.");
        maletaImg.src="https://kiplingco.vteximg.com.br/arquivos/ids/187356/Maleta-Peque%C3%B1a-Para-Mujer-Parker-S26.jpg?v=638280872205400000";
        console.log("peso total ocupado",pesoOcupado);
        return;
    }
    
    espacioOcupado += volumenProducto;
    console.log("volumen cada producto agregado", espacioOcupado);

    pesoOcupado += pesoProducto;
    console.log("Peso cada producto agregado", pesoOcupado);

    const imagenSrc = dataTransfer.getData("id");
    const imgProducto = document.createElement("img"); // Crear un elemento img
    imgProducto.src = imagenSrc; // Establecer la URL de la imagen
    contenedorMaleta.appendChild(imgProducto);
});

//devolver productos
contenedorLista.addEventListener("dragleave", (e) => {
    e.target.classList.remove("hover");
});

contenedorMaleta.addEventListener("click", (e) => {
    if (e.target.classList.contains("list-drag-drop")) {
        const productoSeleccionado = e.target;

        const anchoProducto = parseFloat(productoSeleccionado.dataset.ancho);
        const altoProducto = parseFloat(productoSeleccionado.dataset.alto);
        const profundidadProducto = parseFloat(productoSeleccionado.dataset.profundidad);
        const pesoProducto = parseFloat(productoSeleccionado.dataset.peso);

        const volumenProducto = anchoProducto * altoProducto * profundidadProducto;

        if(pesoOcupado <= 0 && espacioOcupado <= 0){
            pesoOcupado = 0;
            espacioOcupado = 0;
        }

        espacioOcupado -= volumenProducto;
        pesoOcupado -= pesoProducto;

        contenedorLista.appendChild(productoSeleccionado);
    }
});
*/
