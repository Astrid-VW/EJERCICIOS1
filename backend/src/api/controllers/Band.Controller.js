const Band = require("../models/Band.model");
const enumOk = require("../../utils/enumOk");
const Musician = require("../models/Musician.model");

/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++-------C R U D--------+++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
//! ---------------------------------------------------------------------
//? -------------------------------POST create --------------------------
//! ---------------------------------------------------------------------

const createBand = async (req, res, next) => {
  try {
    await Band.syncIndexes();

    /** hacemos una instancia del modelo  */
    const customBody = {
      name: req.body?.name,
      genre: req.body?.genre,
      country: req.body?.country,
      Bands: req.body?.Bands,
      image: req.file.path,
    };
    const newBand = new Band(customBody);
    const savedBand = await newBand.save();

    // test en el runtime
    return res
      .status(savedBand ? 200 : 404)
      .json(savedBand ? savedBand : "error al crear la ciudad");
  } catch (error) {
    return res.status(404).json({
      error: "catch error create Band",
      message: error.message,
    });
  }
};


//! ---------------------------------------------------------------------
//? -------------------------------get by id --------------------------
//! ---------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const BandById = await Band.findById(id);
    if (BandById) {
      return res.status(200).json(BandById);
    } else {
      return res.status(404).json("No se ha encontrado la banda");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
//! ---------------------------------------------------------------------
//? -------------------------------get all ------------------------------
//! ---------------------------------------------------------------------

const getAll = async (req, res, next) => {
  try {
    const allBands = await Band.find().populate("musicos");
    /** el find nos devuelve un array */
    if (allBands.length > 0) {
      return res.status(200).json(allBands);
    } else {
      return res.status(404).json("No se han encontrado bandas");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error al buscar - lanzado en el catch",
      message: error.message,
    });
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------get by name --------------------------
//! ---------------------------------------------------------------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    /// nos devuelve un array de elementos
    const BandByName = await Band.find({ name });
    if (BandByName.length > 0) {
      return res.status(200).json(BandByName);
    } else {
      return res.status(404).json("No se ha encontrado");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error capturado por catch al buscar por nombre",
      message: error.message,
    });
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------DELETE -------------------------------
//! ---------------------------------------------------------------------

const deleteBand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Band = await Band.findByIdAndDelete(id);
    if (Band) {
      // lo buscamos para vr si sigue existiendo o no
      const finByIdBand = await Band.findById(id);

      try {
        const test = await musician.updateMany(
          { Band: id },
          { $pull: { Band: id } }
        );
        console.log(test);

        try {
          await User.updateMany(
            { BandFav: id },
            { $pull: { BandFav: id } }
          );

          return res.status(finByIdBand ? 404 : 200).json({
            deleteTest: finByIdBand ? false : true,
          });
        } catch (error) {
          return res.status(404).json({
            error: "error catch update User",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error catch update Musician",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! ---------------------------------------------------------------------
//? ---------------------add o delete un músico (TOGGLE) --------------
//! ---------------------------------------------------------------------
/// aquí metemos las bandas en el array del modelo de musician
const toggleMusician = async (req, res, next) => {
  try {
    /** este id es el id de la band que queremos actualizar */
    const { id } = req.params;
    const { musicians } = req.body; // -----> idDeLosBands. Enviaremos esto por el req.body "12412242253,12535222232,12523266346"
    /** Buscamos la banda por id para saber si existe */
    const bandById = await Band.findById(id);

    /** vamos a hacer un condicional para que si existe hacer la update y si no, mandamos un 404 */
    if (bandById) {
      /** cogemos el string que traemos del body y lo convertimos en un array
       * separando las posiciones donde en el string habia una coma
       * se hace mediante el metodo split
       */
      const arrayIdMusicians = musicians.split(",");

      /** recorremos este array que hemos creado y vemos si tenemos que:
       * 1) ----> sacar el character porque ya lo tengamos en el back
       * 2) ----> meterlo, en caso de que no lo tengamos metido en el back
       */
      Promise.all(
        arrayIdMusicians.map(async (musician, index) => {
          if (bandById.musicians.includes(musician)) {

            //*************************************************************************** */

            //________ BORRAR DEL ARRAY DE MÚSICOS EL MÚSICO DENTRO DE LA BANDA_________

            //*************************************************************************** */

            try {
              await Band.findByIdAndUpdate(id, {
                // dentro de la clave bands, sacamos el id del elemento que estoy recorriendo
                $pull: { musicians: musician },
              });

              try {
                await Musician.findByIdAndUpdate(musician, {
                  $pull: { band: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update musico",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update banda",
                message: error.message,
              }) && next(error);
            }
          } else {
            //*************************************************************************** */
            //________ METER EL MÚSICO EN EL ARRAY DE MÚSICOS DE LA BANDA_____________
            //*************************************************************************** */
            /** si no lo incluye lo tenemos que meter -------> $push */

            try {
              await Band.findByIdAndUpdate(id, {
                $push: { musicians: musician },
              });
              try {
                await Musician.findByIdAndUpdate(musician, {
                  $push: { bands: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update musician",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update banda",
                message: error.message,
              }) && next(error);
            }
          }
        })
      )
        .catch((error) => res.status(404).json(error.message))
        .then(async () => {
          return res.status(200).json({
            dataUpdate: await Band.findById(id).populate("musicians"),
          });
        });
    } else {
      return res.status(404).json("esta banda no existe");
    }
  } catch (error) {
    return (
      res.status(404).json({
        error: "error catch",
        message: error.message,
      }) && next(error)
    );
  }
};


module.exports = { 
  createBand,
  getById,
  getAll,
  getByName,
  deleteBand,
  toggleMusician
};