import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Configurar __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexión a MongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Connected to the database!"))
  .catch(err => console.error("MongoDB connection error:", err));

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

// Servir archivos estáticos de React
app.use(express.static(path.join(__dirname, "client/dist")));

// Cualquier ruta que no sea API devuelve index.html (React router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

// Rutas de ejemplo de backend
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to User application." });
});


app.listen(config.port, "0.0.0.0", (err) => {
  if (err) console.error(err);
  console.info(`Server started on port ${config.port}`);
  console.info("see http://localhost:%s/ in your browser.", config.port);
});


