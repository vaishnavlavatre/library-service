require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: 5432, // Explicitly specify the port
    logging: false, // optional, to silence logs
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('✅ Connection has been established successfully.');
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });

const createSchemas = async () => {
    await sequelize.query('CREATE SCHEMA IF NOT EXISTS user_schema;');
    await sequelize.query('CREATE SCHEMA IF NOT EXISTS book_schema;');
  };

module.exports = {sequelize,createSchemas};
