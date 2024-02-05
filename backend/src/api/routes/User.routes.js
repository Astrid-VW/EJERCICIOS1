const { upload } = require("../../middleware/files.middleware");
const { registerLargo, registerMedio, registerWithRedirect, sendCode } = require("../controllers/User.controllers");
const express = require("express");
const UserRoutes = express.Router();

UserRoutes.post("/registerLargo", upload.single("image"), registerLargo);

UserRoutes.post("/registerUtil", upload.single("image"),registerMedio);
UserRoutes.get("/registroMedio", upload.single("image"), registerMedio);

UserRoutes.post("/register", upload.single("image"), registerWithRedirect);

UserRoutes.get("register/register/sendMail/:id", sendCode);
module.exports = UserRoutes;
