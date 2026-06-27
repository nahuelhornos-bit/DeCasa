const usuarios = require("../data/usuarios");

function obtenerUsuarios(req, res) {
  res.json(usuarios);
}

function obtenerUsuarioPorId(req, res) {
  const usuario = usuarios.find(u => u.id == req.params.id);
  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  res.json(usuario);
}

function agregarUsuario(req, res) {
  const { nombre, apellido, email, password, rol, barrio } = req.body;

  if (!nombre || !email || !password || !rol) {
    return res.status(400).json({ error: "Faltan datos del usuario" });
  }

  const existe = usuarios.find(u => u.email === email);
  if (existe) {
    return res.status(409).json({ error: "Ya existe un usuario con ese email" });
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    apellido,
    email,
    password,
    rol,
    barrio
  };

  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
}

function eliminarUsuario(req, res) {
  const index = usuarios.findIndex(u => u.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  usuarios.splice(index, 1);
  res.json({ mensaje: "Usuario eliminado" });
}

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  agregarUsuario,
  eliminarUsuario
};