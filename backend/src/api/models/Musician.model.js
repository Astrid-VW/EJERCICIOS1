//! --------- nos requerimos mongoose---
const mongoose = require("mongoose");

//! ----------nos traemos de mongoose la parte de los esquemas de datos

const Schema = mongoose.Schema;

//! --------- creamos los esquemas de datos

// Definir el modelo de datos:
// ------------> Le damos a cada clave del objeto el Type (tipo de dato)
// ------------> definimos otras propiedades que limitan la informacion que se puede incluir en esa clave
// ------------> que sea requerido, una longitud maxima y minima, etc etc


const MusicianSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    role: { type: String, enum: ["Lead singer", "Guitar Player", "Drums", "Bass Player", "Second Guitar", "Keyboards", "Brass", "Strings", "Choir singer", "Others"], required: true },
    band: [{ type: mongoose.Schema.Types.ObjectId, ref: "Band" }],
    image: { type: String, required: true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

//! -------- con la definicion de datos y su esquema vamos a crear el modelo de datos

const Musician = mongoose.model("Musician", MusicianSchema);

//! -------- exportar el modelo para que lo utilicen los controladores

module.exports = Musician;
