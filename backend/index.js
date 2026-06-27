const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

const platosRoutes = require("./routes/platos.routes");
const usuariosRoutes = require("./routes/usuarios.routes");
const uploadRoutes = require("./routes/upload.routes");

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/platos", platosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/api/upload", uploadRoutes);

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
