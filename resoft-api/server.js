// server.js
import path from "path";
import { fileURLToPath } from "url";
import app from "./src/app.js";
import sequelize from "./src/config/db.js";

const PORT = 4000;

// Definir __dirname para rutas de archivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a la base de datos MySQL");

    await sequelize.sync();
    console.log("✅ Tablas sincronizadas correctamente");

    // Ruta raíz (para cargar el frontend)
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "./public/Index.html"));
    });

    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
}

startServer();
