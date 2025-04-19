const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const Book = require('./book'); // make sure Book is defined before you use it

const Role = sequelize.define('Role', {
    role_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        isIn: [['ADMIN', 'STUDENT']], // Enforce valid roles
      },
    },
  }, {
    schema: 'user_schema',
    tableName: 'roles',
    timestamps: false,
  });
  

  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Role, // Reference Role model
        key: 'role_id',
      },
    },
  }, {
    schema: 'user_schema',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at_D',
    updatedAt: 'updated_at_D',
  });
  
  // Define Association
  User.belongsTo(Role, { foreignKey: 'role_id' });
  Role.hasMany(User, { foreignKey: 'role_id' });
  
  // Export both models
  module.exports = { User, Role };
  
  
User.hasMany(Book, { foreignKey: 'user_id' });
Book.belongsTo(User, { foreignKey: 'user_id' });


  
  // Associate Role with User
  User.belongsTo(Role, { foreignKey: 'role_id' });
  Role.hasMany(User, { foreignKey: 'role_id' });

module.exports = {User,Role};