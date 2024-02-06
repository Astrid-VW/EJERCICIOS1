const City = require("../models/City.model");

/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++-------C R U D--------+++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
//! ---------------------------------------------------------------------
//? -------------------------------POST create --------------------------
//! ---------------------------------------------------------------------

const createCity = async (req, res, next) => {
  try {
    await City.syncIndexes();

    /** hacemos una instancia del modelo  */
    const customBody = {
      name: req.body?.name,
      continent: req.body?.continent,
      country: req.body?.country,
      monuments: req.body?.monuments,
      image: req.body?.image,
    };
    const newCity = new City(customBody);
    const savedCity = await newCity.save();

    if (req.file) {
        newCity.image = req.file.path;
      } else {
        newCity.image = "https://res.cloudinary.com/dewx8rqgv/image/upload/v1707250036/greens_spw5mx.png";
      }

    // test en el runtime
    return res
      .status(savedCity ? 200 : 404)
      .json(savedCity ? savedCity : "error al crear la ciudad");
  } catch (error) {
    return res.status(404).json({
      error: "catch error create city",
      message: error.message,
    });
  }
};

module.exports = { createCity };