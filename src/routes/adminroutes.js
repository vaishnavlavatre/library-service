const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User, Role } = require('../models/user');
const Book = require('../models/book');

// Middleware: Authenticate JWT and check if user is ADMIN
// const authenticateJWT = require('../middleware/auth');
// const checkAdmin = (req, res, next) => {
//   if (req.user.role !== 'ADMIN') {
//     return res.status(403).json({ error: 'Forbidden: Admin access required' });
//   }
//   next();
// };


router.post('/register-admin', async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
      const adminRole = await Role.findOne({ where: { role_name: 'ADMIN' } });
      if (!adminRole) {
        return res.status(500).json({ error: "Admin role not found in database" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  

      const newAdmin = await User.create({
        username,
        password_hash: hashedPassword,
        email,
        role_id: adminRole.role_id, // Assign ADMIN role
      });
  
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  

// 1. Get all users (Admin-only)
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Delete a user (Admin-only)
router.delete('/users/:user_id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get all books (Admin-only)
router.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Delete a book (Admin-only)
router.delete('/books/:book_id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.book_id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    await book.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Admin-only: Add a new book (validate admin via role_id)
router.post('/register-book', async (req, res) => {
  const { admin_id, title, isbn, quantity, author_name, category_name } = req.body;

  try {
    // 1. Verify requester is an admin
    const admin = await User.findOne({
      where: { user_id: admin_id },
      include: {
        model: Role,
        where: { role_name: 'ADMIN' }
      }
    });

    if (!admin) {
      return res.status(403).json({ error: "Only admins can register books" });
    }

    // 2. Validate input
    if (!title || !isbn || !quantity || !author_name || !category_name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 3. Check if ISBN already exists
    const existingBook = await Book.findOne({ where: { isbn } });
    if (existingBook) {
      return res.status(409).json({ error: "Book with this ISBN already exists" });
    }

    // 4. Register the book
    const newBook = await Book.create({
      title,
      isbn,
      quantity_available: quantity,
      author_name, // Using direct field (no foreign key)
      category_name // Using direct field (no foreign key)
    });

    res.status(201).json({
      message: "Book registered successfully",
      book: {
        id: newBook.book_id,
        title: newBook.title,
        available: newBook.quantity_available
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;