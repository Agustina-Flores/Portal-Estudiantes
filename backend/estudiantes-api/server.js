// server.js
const jsonServer = require("json-server");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const express = require("express");

const app = express();

// === CONFIGURAR CORS ===
app.use(cors());
app.use(express.json());

// === CONFIGURAR JSON SERVER ===
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Habilitar carpeta pública para imágenes
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use(middlewares);

// === CONFIGURAR MULTER ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// === ENDPOINT PARA SUBIR IMAGEN ===
app.post("/upload", upload.single("file"), (req, res) => {
  const host = req.headers.host; // <--IP real que te llamó
  const fileUrl = `http://${host}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});
/*
app.post("/upload", upload.single("file"), (req, res) => {
  const fileUrl = `http://localhost:3001/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});
*/
// === MONTAR JSON SERVER SOBRE EXPRESS ===
app.use("/api", router);

// === INICIAR SERVIDOR ===
const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://192.168.1.14:${PORT}`);
  console.log(`JSON Server en http://192.168.1.14:${PORT}/api`);
});

/*
const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`JSON Server en http://localhost:${PORT}/api`);
});
*/