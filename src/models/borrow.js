const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Borrow = sequelize.define('Borrow', {
  borrow_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id',
    },
  },
  book_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'books',
      key: 'book_id',
    },
  },
  borrow_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  schema: 'user_schema',
  tableName: 'borrow_records',
});

module.exports = Borrow;