//! --------- nos requerimos mongoose---
const mongoose = require("mongoose");

//! ----------nos traemos de mongoose la parte de los esquemas de datos

const Schema = mongoose.Schema;

//! --------- creamos los esquemas de datos

// Definir el modelo de datos:
// ------------> Le damos a cada clave del objeto el Type (tipo de dato)
// ------------> definimos otras propiedades que limitan la informacion que se puede incluir en esa clave
// ------------> que sea requerido, una longitud maxima y minima, etc etc


const CitiesSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
      continent: {type: String, enum: ["Oceania", "Europa", "América del Norte", "Latinoamérica", "Asia", "África", "Antártida"], required: true},
      country: { type: String, required: true },
      monuments: { type: mongoose.Schema.Types.ObjectId, ref: "Monument", required: false },
      image: { type: String, required: true },
      likes: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      //owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    {
      timestamps: true,
    }
  );
  
  const City = mongoose.model("City", CitiesSchema);
  
  module.exports = City;
  