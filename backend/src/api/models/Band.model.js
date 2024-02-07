//! --------- nos requerimos mongoose---
const mongoose = require("mongoose");

//! ----------nos traemos de mongoose la parte de los esquemas de datos

const Schema = mongoose.Schema;

//! --------- creamos los esquemas de datos

// Definir el modelo de datos:
// ------------> Le damos a cada clave del objeto el Type (tipo de dato)
// ------------> definimos otras propiedades que limitan la informacion que se puede incluir en esa clave
// ------------> que sea requerido, una longitud maxima y minima, etc etc


const BandSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
      genre: {type: String, enum: ["rock", "jazz", "classical", "folk", "pop", "electronic", "bso", "ethnic", "blues", "metal"], required: true},
      country: { type: String, required: true },
      musicians: [{ type: mongoose.Schema.Types.ObjectId, ref: "musicians", required: false }],
      image: { type: String, required: true },
      likes: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      //owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    {
      timestamps: true,
    }
  );
  
  const Band = mongoose.model("Band", BandSchema);
  
  module.exports = Band;
  