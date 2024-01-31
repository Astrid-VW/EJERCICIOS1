const dotenv = require('dotenv');
dotenv.config();

const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
console.log (MONGO_URI)

/// hacemos la funcion que se exporta y luego importa en el index que va conectar con Mongo

const connect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI);

    // AHORA NOS VAMOS A TRAER EL HOST  y el NAME  de la DB --

    const { name, host } = db.connection;

    console.log(
      `Conectada la DB 👌  en el host: ${host} con el nombre: ${name}`
    );
  } catch (error) {
    console.log("No se ha conectado la db❌", error.message);
  }
};

module.exports = { connect };
