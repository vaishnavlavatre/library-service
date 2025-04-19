const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Book = sequelize.define('Book', {
  book_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING(13),
    allowNull: false,
    unique: true,
  },
  quantity_available: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  // Temporarily remove foreign keys (author_id/category_id)
  author_name: {  // Simple string field instead of relationship
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  category_name: { // Simple string field instead of relationship
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  schema: 'user_schema',
  tableName: 'books',
  timestamps: true,
  underscored: true,
});

module.exports = Book;