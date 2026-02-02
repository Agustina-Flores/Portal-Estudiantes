// server.js
const jsonServer = require("json-server");
const cors = require("cors");
const express = require("express");

const app = express();

// === CONFIGURAR CORS ===
app.use(cors());
app.use(express.json());

// === CONFIGURAR JSON SERVER ===
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(router);
// === INICIAR SERVIDOR ===
const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://192.168.1.2:${PORT}`);
  console.log(`JSON Server en http://192.168.1.2:${PORT}/api`);
});

/*
const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);//Local
  console.log(`JSON Server en http://localhost:${PORT}/api`);
});
*/