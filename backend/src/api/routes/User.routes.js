const { upload } = require("../../middleware/files.middleware");
const { registerLargo, registerMedio, registerWithRedirect, sendCode, resendCode, checkNewUser, login, autoLogin, changePassword, sendPassword } = require("../controllers/User.controllers");
const express = require("express");
const UserRoutes = express.Router();

UserRoutes.post("/registerLargo", upload.single("image"), registerLargo);

UserRoutes.post("/registerUtil", upload.single("image"),registerMedio);
UserRoutes.get("/registroMedio", upload.single("image"), registerMedio);

UserRoutes.post("/register", upload.single("image"), registerWithRedirect);

UserRoutes.post("/sendMail/:id", sendCode);

UserRoutes.post("/resend", resendCode);
UserRoutes.post("/check", checkNewUser);

UserRoutes.post("/login", login);

UserRoutes.post("/autoLogin", autoLogin);

UserRoutes.patch("/forgotPassword", changePassword);
UserRoutes.patch("/sendPassword/:id", sendPassword);

module.exports = UserRoutes;
