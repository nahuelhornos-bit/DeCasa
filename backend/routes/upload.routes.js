const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { subirImagen } = require("../controllers/upload.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const nombre = Date.now() + extension;
    cb(null, nombre);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten imagenes"), false);
    }
  }
});

router.post("/", upload.single("imagen"), subirImagen);

module.exports = router;
