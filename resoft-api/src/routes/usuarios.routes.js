// src/routes/usuarios.routes.js
import express from "express";
import bcrypt from "bcrypt";
import { Usuario } from "../models/usuario.model.js";
const router = express.Router();


// Ruta para registrar un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
    });

    res.json({ success: true, message: "Usuario registrado con éxito", usuario: nuevoUsuario });
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    res.status(500).json({ success: false, message: "Error al registrar usuario" });
  }
});

// Ruta para login de usuario
// Ruta para login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por correo
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    // Comparar contraseñas encriptadas
    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }

    // Si todo está bien, devolver los datos básicos del usuario
    res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });

  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
});



export default router;

