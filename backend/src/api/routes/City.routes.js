const { createCity } = require("../controllers/City.Controller");
const { upload } = require("../../middleware/files.middleware");
const CityRoutes = require("express").Router();

CityRoutes.post("/", upload.single("image"), createCity);

module.exports = CityRoutes;