// src/models/usuario.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Usuario = sequelize.define("usuarios", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "usuarios",
  timestamps: true,
});
