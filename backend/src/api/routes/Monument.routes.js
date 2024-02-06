const { createMonument } = require("../controllers/Monument.controller");
const { upload } = require("../../middleware/files.middleware");
const MonumentRoutes = require("express").Router();

MonumentRoutes.post("/", upload.single("image"), createMonument);

module.exports = MonumentRoutes;
