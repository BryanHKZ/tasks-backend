const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");

//Crea proyectos : /api/proyectos
router.post(
  "/",
  auth,
  [check("nombre", "El nombre es obligatorio.").not().isEmpty()],
  projectController.crearProyecto
);
//Obtener los proyectos
router.get("/", auth, projectController.obtenerProyectos);

//Actualizar proyectos via ID
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre es obligatorio.").not().isEmpty()],
  projectController.actualizarProyecto
);

//Eliminar un Proyecto
router.delete("/:id", auth, projectController.eliminarProyecto);

module.exports = router;
