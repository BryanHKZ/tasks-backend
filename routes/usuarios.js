const express = require("express");
const router = express.Router();

const userControler = require("../controllers/userController");

const { check } = require("express-validator");

//Crea un usuario
// api/usuarios

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es inválido").isEmail(),
    check("password","La contraseña debe tener minimo 6 caracteres").isLength({ min: 6 }),
  ],
  userControler.crearUsuario
);

module.exports = router;
