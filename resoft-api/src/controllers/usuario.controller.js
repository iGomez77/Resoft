import bcrypt from "bcrypt";
import { Usuario } from "../models/usuario.model.js";

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por correo
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    // Comparar contraseñas usando bcrypt
    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }

    // Si todo está bien
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
    console.error("Error en loginUsuario:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};
