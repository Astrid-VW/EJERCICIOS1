const { createMusician, getById, getAll, getByName, deleteMusician, toggleMusician, toggleBand } = require("../controllers/Musician.controller");
const { upload } = require("../../middleware/files.middleware");
const MusicianRoutes = require("express").Router();

MusicianRoutes.post("/musician/", upload.single("image"), createMusician);
MusicianRoutes.get("/musician/:id", getById);
MusicianRoutes.get("/musician/", getAll);
MusicianRoutes.get("/musician/byName/:name", getByName);
MusicianRoutes.delete("/musician/:id", deleteMusician);
MusicianRoutes.patch("/musician/:id", toggleBand);

module.exports = MusicianRoutes;
