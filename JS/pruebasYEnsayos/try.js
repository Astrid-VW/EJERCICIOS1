let age
age=18
console.log(age)
if(age >=18) {console.log("Eres mayor de edad")}


let number = 18

number == 17 ? console.log("No puedes entrar") : console.log("Adelante")
console.log(number)


function suma(numA, numB){
    return  numA + numB;
}

let resultado = suma(5, 20)
console.log(resultado)

/*Iteración #2: Buscar la palabra más larga**

Completa la función que tomando un array de strings como argumento devuelva el más largo, en caso de que dos strings tenga la misma longitud deberá devolver el primero.

Puedes usar este array para probar tu función:*/

/*const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];

function findLongestWord(array) {
    let longestElement = ""
        array.forEach((element)=> {(element.length) &&
        if(element i=0; < element+1){
            return element+1
        }

PROBAR: for (let i = 0; i < studentList.length; i++)

console.log(avengers.findLongestWord)*/

// ESTUDIAR ACCUMULATOR, CURRENT VALUE, REDUCE, ETC


function sumar(a,b){
    return a+b;
}


let resultado1 = sumar(3,4)
console.log (resultado1)

/* no lo entiendo. No sé cómo tengo que llamar al console.log 
para que me lo saque por consola. Si pongo el nombre la función
sólo me sale el nombre de la función. Cómo hago para aplicar la función?
Dónde está definido checkAge?
let checkAge =

function showMovie(age){
    if(!checkAge(age)) {
        return;
    }

    console.log("Mostrando película");
}

console.log(showMovie(20)) */

//--------------------------------------------------


/* function showPokemon(name){
    if (name === undefined){
        name = "Magikarp";
    }
    console.log(name)
}

const pruebaPokemon = showPokemon();
console.log(pruebaPokemon);
*/

// -----------------------------------------------------------

const sumarArrow = (c,d) => c + d;

const suma2 = sumarArrow(3,8)

console.log(suma2)

//---------------------------------------------------------

function showCount (count) {
    console.log(count??"unkown");
}

const funcionCuenta = showCount(null)

console.log(funcionCuenta)*/



