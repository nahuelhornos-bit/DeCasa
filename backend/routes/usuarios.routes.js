const express = require("express");
const router = express.Router();

const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  agregarUsuario,
  eliminarUsuario
} = require("../controllers/usuarios.controller");

router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.post("/", agregarUsuario);
router.delete("/:id", eliminarUsuario);

module.exports = router;
