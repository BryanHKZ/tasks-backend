const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.crearUsuario = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errores: errors.array() });

  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) return res.status(400).json({ msg: "El usuario ya existe" });

    usuario = new Usuario(req.body);

    //Hashear el password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    // Guardar el usuario en la base de datos
    await usuario.save();

    //Crear y firmar un JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Ha ocurrido un error");
  }
};
