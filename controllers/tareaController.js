const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearTarea = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errores: errors.array() });

  const { proyectoId } = req.body;

  try {
    const proyecto = await Proyecto.findById(proyectoId);

    if (!proyecto)
      return res.status(404).json({ msg: "Proyecto no encontrado" });

    if (proyecto.creador.toString() !== req.usuario.id)
      return res.status(401).json({ msg: "No tienes acceso" });

    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error" });
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    const { proyectoId } = req.query;
    const proyecto = await Proyecto.findById(proyectoId);

    if (!proyecto)
      return res.status(404).json({ msg: "Proyecto no encontrado" });

    if (proyecto.creador.toString() !== req.usuario.id)
      return res.status(401).json({ msg: "No tienes acceso" });

    const tareas = await Tarea.find({ proyectoId: proyectoId }).sort({creado: -1});

    res.json(tareas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error" });
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const { proyectoId, nombre, estado } = req.body;
    const proyecto = await Proyecto.findById(proyectoId);

    var tarea = await Tarea.findById(req.params.id);

    if (proyecto.creador.toString() !== req.usuario.id)
      return res.status(401).json({ msg: "No tienes acceso" });

    if (!tarea) return res.status(404).json({ msg: "Tarea no encontrada" });

    const nuevaTarea = {};

    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    tarea = await Tarea.findByIdAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });

    res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error" });
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const { proyectoId } = req.query;
    const proyecto = await Proyecto.findById(proyectoId);

    var tarea = await Tarea.findById(req.params.id);

    if (!tarea) return res.status(404).json({ msg: "Tarea no encontrada" });

    if (proyecto.creador.toString() !== req.usuario.id)
      return res.status(401).json({ msg: "No tienes acceso" });

    await Tarea.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error" });
  }
};
