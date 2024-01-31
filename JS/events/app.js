/*Iteración #1: Creando Events


1.1 Añade un botón a tu html con el id btnToClick y en tu javascript añade el 
evento click que ejecute un console log con la información del evento del click*/

const button = document.querySelector("#btnToClick");
button.textContent = "Presióname!";
button.addEventListener("click", (e) => {
    console.log(e)
});

document.body.appendChild(button)

/*1.2 Añade un evento 'focus' que ejecute un console.log con el valor del input.*/

const focus = document.getElementsByClassName("focus");
focus[0].addEventListener("focus", (evento) =>{
    console.log(evento.target.value)
});


/*1.3 Añade un evento 'input' que ejecute un console.log con el valor del input.*/

const value =document.querySelector(".value")
value.addEventListener("input",(event) =>{
    console.log(event.target.value)
});