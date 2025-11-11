// src/app.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";

dotenv.config(); 

const app = express();

// dirname con módulos 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Middleware
app.use(cors());
app.use(express.json());

// Rutas API
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/products", productRoutes);

// Servir imágenes estáticas
app.use("/img", express.static(path.resolve("./img")));

// Servir archivos del frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../public")));

// Ruta raíz (opcional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/Index.html"));
});

export default app;
