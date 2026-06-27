const platos = require("../data/platos");

function obtenerPlatos(req, res) {
  res.json(platos);
}

function obtenerPlatoPorId(req, res) {
  const plato = platos.find(p => p.id == req.params.id);
  if (!plato) {
    return res.status(404).json({ error: "Plato no encontrado" });
  }
  res.json(plato);
}

function agregarPlato(req, res) {
  const { nombre, cocinero, barrio, descripcion, precio, porciones, imagenUrl, solidaria } = req.body;

  if (!nombre || !precio || !porciones) {
    return res.status(400).json({ error: "Faltan datos del plato" });
  }

  const nuevoPlato = {
    id: platos.length + 1,
    nombre,
    cocinero,
    barrio,
    descripcion,
    precio,
    porciones,
    imagenUrl,
    solidaria: solidaria || false
  };

  platos.push(nuevoPlato);
  res.status(201).json(nuevoPlato);
}

function modificarPlato(req, res) {
  const plato = platos.find(p => p.id == req.params.id);
  if (!plato) {
    return res.status(404).json({ error: "Plato no encontrado" });
  }
  plato.nombre = req.body.nombre || plato.nombre;
  plato.precio = req.body.precio || plato.precio;
  plato.porciones = req.body.porciones || plato.porciones;
  res.json(plato);
}

function eliminarPlato(req, res) {
  const index = platos.findIndex(p => p.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Plato no encontrado" });
  }
  platos.splice(index, 1);
  res.json({ mensaje: "Plato eliminado" });
}

module.exports = {
  obtenerPlatos,
  obtenerPlatoPorId,
  agregarPlato,
  modificarPlato,
  eliminarPlato
};