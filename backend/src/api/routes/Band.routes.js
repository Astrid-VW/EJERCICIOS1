const { createBand, getById, getAll, getByName, deleteBand, toggleMusician } = require("../controllers/Band.Controller");
const { upload } = require("../../middleware/files.middleware");
const BandRoutes = require("express").Router();

BandRoutes.post("/band/", upload.single("image"), createBand);
BandRoutes.get("/band/:id", getById);
BandRoutes.get("/band/", getAll);
BandRoutes.get("/band/byName/:name", getByName);
BandRoutes.delete("/band/:id", deleteBand); 
BandRoutes.patch("/band/add/:id", toggleMusician);

module.exports = BandRoutes;