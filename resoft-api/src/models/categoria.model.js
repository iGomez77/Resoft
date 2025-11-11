import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'categorias',
  timestamps: false // no necesitamos createdAt/updatedAt
});

