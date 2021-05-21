const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tareaController");
const auth = require("../middlewares/auth");

//Crear tarea : /api/tareas

router.post("/", auth, tareaController.crearTarea);

router.get("/", auth, tareaController.obtenerTareas);

router.put("/:id", auth, tareaController.actualizarTarea);

router.delete("/:id", auth, tareaController.eliminarTarea);

module.exports = router;
