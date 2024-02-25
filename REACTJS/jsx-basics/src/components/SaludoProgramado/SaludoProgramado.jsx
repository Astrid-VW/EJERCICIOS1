const hoy = new Date();
const horaActual = hoy.getHours();
  
// Determinar el saludo según la hora en function arrow

const SaludoProgramado = () => {
    let saludo
    if (horaActual >= 6 && horaActual < 12) {
      saludo = "Buenos días";
    } else if (horaActual >= 12 && horaActual < 20) {
      saludo = "Buenas tardes";
    } else {
      saludo = "Buenas noches";
    }
   
    return (
        <div>
            <h2>{saludo}</h2>
        </div>
     );
    }

export default SaludoProgramado;
