import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Categoria } from "./categoria.model.js"; // 👈 importa el modelo de categorías

export const Product = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

// 🟢 Asociación con Categoría
Product.belongsTo(Categoria, {
  foreignKey: "categoria_id",
  as: "categoria",
});
