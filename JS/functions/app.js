/* Iteración #1: Buscar el máximo

Completa la función que tomando dos números como argumento devuelva el más alto.*/

function sum(numberOne , numberTwo) {
    if(numberOne > numberTwo) {
        return numberOne
    } else {
    return numberTwo
    }
}

let max = sum(5 , 22)
console.log(max)

/*Iteración #2: Buscar la palabra más larga**

Completa la función que tomando un array de strings como argumento devuelva el más largo, en caso de que dos strings tenga la misma longitud deberá devolver el primero.

Puedes usar este array para probar tu función:*/


const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];

function findLongestWord(array) {
    let longestWord = ""
        array.forEach((hero, index)=> {
            hero.length > longestWord.length && (longestWord = hero)
        })
  return longestWord
}

console.log(findLongestWord(avengers))


/**Iteración #3: Calcular la suma**

Calcular una suma puede ser tan simple como iterar sobre un array y sumar cada uno de los elementos.
Implemente la función denominada sumNumbers que toma un array de números como argumento y devuelve la suma de todos los números de la matriz. 

Puedes usar este array para probar tu función:*/

const numbers = [1, 2, 3, 5, 45, 37, 58];

const sum2 = numbers.reduce((accumulator, currentValue) => accumulator + currentValue);

console.log(sum2)

/**Iteración #4: Calcular el promedio**

Calcular un promedio es una tarea extremadamente común. Puedes usar este array para probar tu función:*/

const numbers2 = [12, 21, 38, 5, 45, 37, 6];

const average = numbers2.reduce((accumulator, currentValue) => accumulator + currentValue) /
numbers2.length;

console.log(average)
 
/**Iteración #5: Calcular promedio de strings**

Crea una función que reciba por parámetro un array y cuando es un valor number lo sume y de lo contrario cuente la longitud del string y lo sume.
Puedes usar este array para probar tu función: */

const mixedElements = [6, 1, 'Rayo', 1, 'vallecano', '10', 'upgrade', 8, 'hub'];

function averageWord(array) {
  let arrayNumbers = array.map((entry) => {
    if (typeof entry === "string"){
      return entry.length;
    } else if (typeof entry === "number") {
      return entry;
    } else {
      return 0
    }    
  })

// lo llamo iTotal con i de integer
  const iTotal = arrayNumbers.reduce((accumulator, currentValue) => accumulator + currentValue)
    return iTotal
  /*let arrayStrings = array.filter(function(element) { 
    return typeof element == 'string' });
  

  let arrayNumbers = array.filter(function(element) { 
    return typeof element == 'number' });



  let sumMixedElements =   + "".length*/
}

const iTotal = averageWord(mixedElements)

console.log("el resultado de la funcion averageWord es", iTotal)

/**Iteración #6: Valores únicos

Crea una función que reciba por parámetro un array y compruebe si existen elementos duplicados, en caso que existan los elimina para retornar un array sin los elementos duplicados. Puedes usar este array para probar tu función:

const duplicates = [
  'sushi',
  'pizza',
  'burger',
  'potatoe',
  'pasta',
  'ice-cream',
  'pizza',
  'chicken',
  'onion rings',
  'pasta',
  'soda'
];
function removeDuplicates(param) {
  // insert code
} */