function subirImagen(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "No se recibio ninguna imagen" });
  }
  const url = `http://localhost:3000/uploads/${req.file.filename}`;
  res.json({ url });
}

module.exports = {
  subirImagen
};
