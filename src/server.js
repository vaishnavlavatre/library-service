const app = require('./app');
const {sequelize,createSchemas } = require('./config/db');
const { User, Role } = require('./models/user'); // Fixed 
const Book = require('./models/book'); // Import Book model
const Borrow = require('./models/borrow');

const PORT = process.env.PORT || 3000;
console.log('count: %d' , PORT)
// Sync database and start server
const initializeRoles = async () => {
    await Role.findOrCreate({ where: { role_name: 'ADMIN' } });
    await Role.findOrCreate({ where: { role_name: 'STUDENT' } });
    
  };
  
  // Sync database and start server
  (async () => {
    await createSchemas();
    await sequelize.sync();
    await initializeRoles(); // Create roles if missing
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })();