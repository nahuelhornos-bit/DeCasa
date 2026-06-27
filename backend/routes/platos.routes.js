const express = require("express");
const router = express.Router();

const {
  obtenerPlatos,
  obtenerPlatoPorId,
  agregarPlato,
  modificarPlato,
  eliminarPlato
} = require("../controllers/platos.controller");

router.get("/", obtenerPlatos);
router.get("/:id", obtenerPlatoPorId);
router.post("/", agregarPlato);
router.put("/:id", modificarPlato);
router.delete("/:id", eliminarPlato);

module.exports = router;
