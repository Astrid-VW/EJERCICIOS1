const Monument = require("../models/Monument.model");

/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++-------C R U D--------+++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
//! ---------------------------------------------------------------------
//? -------------------------------POST create --------------------------
//! ---------------------------------------------------------------------

const createMonument = async (req, res, next) => {
  try {
    await Monument.syncIndexes();

    /** hacemos una instancia del modelo  */
    const customBody = {
      name: req.body?.name,
      type: req.body?.type,
      image: req.body?.image,
      ciy: req.body?.city,
    };
    const newMonument = new Monument(customBody);
    const savedMonument = await newMonument.save();

    if (req.file) {
        newMonument.image = req.file.path;
      } else {
        newMonument.image = "https://res.cloudinary.com/dewx8rqgv/image/upload/v1707250493/puerta-de-alcala_uszkzu.png";
      }

    // test en el runtime
    return res
      .status(savedMonument ? 200 : 404)
      .json(savedMonument ? savedMonument : "error al crear la ciudad");
  } catch (error) {
    return res.status(404).json({
      error: "catch error create Monument",
      message: error.message,
    });
  }
};

module.exports = { createMonument };