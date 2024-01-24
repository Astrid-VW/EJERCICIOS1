/*1.1 Usa querySelector para mostrar por consola el botón con la clase .showme

*/ 

const buttonShowMe = document.querySelector(".showme");

console.log(buttonShowMe);

/*1.2 Usa querySelector para mostrar por consola el h1 con el id #pillado*/

const h1Pillado = document.querySelector("#pillado")

console.log(h1Pillado);

/*1.3 Usa querySelector para mostrar por consola todos los p*/

const allP = document.querySelectorAll("p")
console.log (allP)

//eS UN ARRAY ESPECIAL PORQUE ES UNA LISTA DE NODOS. pARA VER PROPIEDADES, CONSULTAR PROTOTYPE)


/* 1.4 Usa querySelector para mostrar por consola todos los elementos con la clase.pokemon */

const allPokemonClass = document.querySelectorAll(".pokemon");
console.log (allPokemonClass);

/* 1.5 Usa querySelector para mostrar por consola todos los elementos con el atributo 
data-function="testMe".*/

const allDataFunction = document.querySelectorAll("[data-function='testMe']")
console.log ("atributos data function", allDataFunction);

/* 1.6 Usa querySelector para mostrar por consola el 3 personaje con el atributo 
data-function="testMe".*/

console.log("tercer elemento data function", allDataFunction[2]);
