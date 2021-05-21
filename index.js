const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

//Crear el servidor
const app = express();

connectDB();

app.use(cors());

app.use(express.json({ extended: true }));

//Definir puerto de la API
const PORT = process.env.PORT || 3001;

// Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

//Arrancar la API
app.listen(PORT, () => {
  console.log(`Servidor encendido en el puerto ${PORT}`);
});
