const { upload } = require("../../middleware/files.middleware");
const { 
    registerLargo, 
    registerMedio, 
    registerWithRedirect, 
    sendCode, 
    resendCode, 
    checkNewUser, 
    login, 
    autoLogin, 
    changePassword, 
    sendPassword,
    modifyPassword,
    update,
    deleteUser,
} = require("../controllers/User.controllers");
const express = require("express");
const User = require("../models/User.model");
const { isAuth } = require("../../middleware/auth.middleware");
const UserRoutes = express.Router();


//!----------------------ENDPOINTS SIN AUTENTICACIÓN-----------------

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

//!----------------------ENDPOINTS CON AUTENTICACIÓN-----------------

UserRoutes.patch("/changepassword", [isAuth], modifyPassword);

UserRoutes.patch("/update/update/",[isAuth], upload.single("image"), update)

UserRoutes.delete("/", [isAuth], deleteUser);

module.exports = UserRoutes;
