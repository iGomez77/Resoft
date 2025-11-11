// src/config/db.js
import { Sequelize } from 'sequelize';

// Configura la conexión a tu base de datos MySQL
const sequelize = new Sequelize('resoft_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// (para server.js)
export default sequelize;

// (por si se necesita en otros archivos)
export { sequelize };
