const Musician = require("../models/Musician.model");
const enumOk = require("../../utils/enumOk");
const {deleteImgCloudinary} = require("../../middleware/files.middleware");
const Band = require("../models/Band.model");

/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++-------C R U D--------+++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
//! ---------------------------------------------------------------------
//? -------------------------------POST create --------------------------
//! ---------------------------------------------------------------------

const createMusician = async (req, res, next) => {
  try {
    await Musician.syncIndexes();
    const testEnumOk = enumOk(req.body?.role);

    /** hacemos una instancia del modelo  */
    const customBody = {
      name: req.body?.name,
      role: testEnumOk?(req.body?.role):"Other",
      band: req.body?.band,
      image: req.file.path,
    };
    const newMusician = new Musician(customBody);
    const savedMusician = await newMusician.save();

    // test en el runtime
    return res
      .status(savedMusician ? 200 : 404)
      .json(savedMusician ? savedMusician : "error al crear el músico");
  } catch (error) {
    deleteImgCloudinary(req.file.path)
    return res.status(404).json({
      error: "catch error create Musician" , 
      message: error.message
    });
  }
};


//! ---------------------------------------------------------------------
//? -------------------------------get by id --------------------------
//! ---------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const MusicianById = await Musician.findById(id);
    if (MusicianById) {
      return res.status(200).json(MusicianById);
    } else {
      return res.status(404).json("No se ha encontrado el músico");
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
    const allMusicians = await Musician.find().populate("bands");
    /** el find nos devuelve un array */
    if (allMusicians.length > 0) {
      return res.status(200).json(allMusicians);
    } else {
      return res.status(404).json("No se han encontrado músicos");
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
    const musicianByName = await Musician.find({ name });
    if (musicianByName.length > 0) {
      return res.status(200).json(musicianByName);
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

const deleteMusician = async (req, res, next) => {
  try {
    const { id } = req.params;
    const musician = await Musician.findByIdAndDelete(id);
    if (musician) {
      // lo buscamos para vr si sigue existiendo o no
      const finByIdMusician = await Musician.findById(id);

      try {
        const test = await band.updateMany(
          { musician: id },
          { $pull: { musician: id } }
        );
        console.log(test);

        try {
          await User.updateMany(
            { musicianFav: id },
            { $pull: { musicianFav: id } }
          );

          return res.status(finByIdMusician ? 404 : 200).json({
            deleteTest: finByIdMusician ? false : true,
          });
        } catch (error) {
          return res.status(404).json({
            error: "error catch update User",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error catch update Band",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! ---------------------------------------------------------------------
//? ---------------------add o delete una banda (TOGGLE) --------------
//! ---------------------------------------------------------------------
/// aquí metemos las bandas en el array del modelo de musician
const toggleBand = async (req, res, next) => {
  try {
    /** este id es el id de la band que queremos actualizar */
    const { id } = req.params;
    const { bands } = req.body; // -----> idDeLasBandas. Enviaremos esto por el req.body "12412242253,12535222232,12523266346"
    /** Buscamos la banda por id para saber si existe */
    const musicianById = await Musician.findById(id);

    /** vamos a hacer un condicional para que si existe hacer la update y si no, mandamos un 404 */
    if (musicianById) {
      /** cogemos el string que traemos del body y lo convertimos en un array
       * separando las posiciones donde en el string habia una coma
       * se hace mediante el metodo split
       */
      const arrayIdBands = bands.split(",");

      /** recorremos este array que hemos creado y vemos si tenemos que:
       * 1) ----> sacar el character porque ya lo tengamos en el back
       * 2) ----> meterlo, en caso de que no lo tengamos metido en el back
       */
      Promise.all(
        arrayIdBands.map(async (band, index) => {
          if (musicianById.bands.includes(band)) {

            //*************************************************************************** */

            //________ BORRAR DEL ARRAY DE MÚSICOS EL MÚSICO DENTRO DE LA BANDA_________

            //*************************************************************************** */

            try {
              await Musician.findByIdAndUpdate(id, {
                // dentro de la clave musicians, sacamos el id del elemento que estoy recorriendo
                $pull: { bands: band },
              });

              try {
                await Band.findByIdAndUpdate(band, {
                  $pull: { musicians: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update banda",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update musico",
                message: error.message,
              }) && next(error);
            }
          } else {
            //*************************************************************************** */
            //________ METER LA BANDA EN EL ARRAY DE BANDAS DEL MÚSICO_____________
            //*************************************************************************** */
            /** si no lo incluye lo tenemos que meter -------> $push */

            try {
              await Musician.findByIdAndUpdate(id, {
                $push: { bands: band },
              });
              try {
                await Band.findByIdAndUpdate(band, {
                  $push: { musician: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update banda",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update musico",
                message: error.message,
              }) && next(error);
            }
          }
        })
      )
        .catch((error) => res.status(404).json(error.message))
        .then(async () => {
          return res.status(200).json({
            dataUpdate: await Musician.findById(id).populate("bands"),
          });
        });
    } else {
      return res.status(404).json("este músico no existe");
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
  createMusician,
  getById,
  getAll,
  getByName,
  deleteMusician,
  toggleBand
};