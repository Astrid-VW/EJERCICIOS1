/* Iteración #2: Modificando el DOM
Dato el siguiente HTML: */


/*2.1 Inserta dinamicamente en un html un div vacio con javascript.*/


const newDiv = document.createElement("div");
document.body.appendChild(newDiv);

/*o con TEMPLATE://

const template = `<div></div>`
document.body.innerHTML += template*/

//o con funcionArrow//
/*const templateArrow = () => `<div></div>`;
document.body.innerHTML += templateArrow();*/

/* 2.2 Inserta dinamicamente en un html un div que contenga una p con javascript.*/

const div = document.createElement("div");
const newP = document.createElement("p");

newP.textContent = "Párrafo dentro del div";

div.appendChild(newP);
document.body.appendChild(div);

//o con TEMPLATE (en este caso es más cómodo porque no hay que crear los div ni la p antes)

/*const template = () => `
<div>
<p>Este es otro párrafo dentro del script</p>
</div>
`
document.body.innerHTML += template();

2.3 Inserta dinamicamente en un html un div que contenga 6 p utilizando un loop con javascript.*/

const divWithSixP = document.createElement("div");

for (let i = 0; i < 6; i++){
    const nuevoParrafo = document.createElement("p")
    nuevoParrafo.textContent = `Este es el párrafo ${i + 1}`

    divWithSixP.appendChild(nuevoParrafo);
}

document.body.appendChild(divWithSixP)


/*2.4 Inserta dinamicamente con javascript en un html una p con el texto 'Soy dinámico!'.*/

const newPDinamic = document.createElement("p")
newPDinamic.textContent = "Soy minerooo";

document.body.appendChild(newPDinamic);

/*2.5 Inserta en el h2 con la clase .fn-insert-here el texto 'Wubba Lubba dub dub'.*/

const h2InsertHere = document.querySelector("h2.fn-insert-here")
h2InsertHere.textContent = 'Wubba Lubba dub dub';

//----------- o hacerlo con TEMPLATE -------

//document.querySelector("h2.fn-insert-here").innerHTML = 'Wubba Lubba dub dub';

/*2.6 Basandote en el siguiente array crea una lista ul > li con los textos del array.*/

const apps = ['Facebook', 'Netflix', 'Instagram', 'Snapchat', 'Twitter'];
const ulList = document.createElement("ul");

// Ahora iteramos el array y por cada elemento creamos un li con el texto del elemento//
//y luego añadimos al ul//

apps.forEach((app) => {
    const elementLi = document.createElement("li")
    elementLi.textContent = app;
    ulList.appendChild(elementLi);
});

document.body.appendChild(ulList);

/*2.7 Elimina todos los nodos que tengan la clase .fn-remove-me*/

const allRemoveMe = document.querySelectorAll(".fn-remove-me");

//no podemos eliminar una lista de nodos directamente. Hay que recorrerla con un FOREACH//

allRemoveMe.forEach((element) => {
    element.remove();
});

/*2.8 Inserta una p con el texto 'Voy en medio!' entre los dos div. 
	Recuerda que no solo puedes insertar elementos con .appendChild.*/

const pVoyEnMedio = document.createElement("p");
pVoyEnMedio.textContent = "Voy en medio";

const allDivInsertHere = document.querySelectorAll("div.fn-insert-here");

console.log(allDivInsertHere);

const secondDiv = allDivInsertHere[1];

document.body.insertBefore(pVoyEnMedio, secondDiv);

/*2.9 Inserta p con el texto 'Voy dentro!', dentro de todos los div con la clase .fn-insert-here*/

const pVoyDentro = document.querySelectorAll("div.fn-insert-here");

const templateNewParagraph = () => `<p>Voy dentro!</p>`;

//recorremos la lista de div con la misma clase y por cada uno le inyectamos la el template//

pVoyDentro.forEach((div) => (div.innerHTML = templateNewParagraph()));