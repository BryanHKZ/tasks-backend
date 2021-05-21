const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const authControler = require("../controllers/authController");

// Iniciar sesion
// api/auth

router.post("/", authControler.authUser);

router.get("", auth, authControler.usuarioAutenticado);

module.exports = router;