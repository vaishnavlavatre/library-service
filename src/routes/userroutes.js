const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
    try {
      const { username, password_hash, email } = req.body;
  
      // Basic validation
      if (!username || !password_hash || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const newUser = await User.create({ username, password_hash, email });
  
      res.status(201).json(newUser);
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(400).json({ error: err.message });
    }
  });

  
// Example route to get user's borrowed books
router.get('/user/:user_id/books', async (req, res) => {
  try {
    const borrowings = await Borrow.findAll({
      where: { user_id: req.params.user_id },
      include: [{ 
        model: Book,
        attributes: ['title', 'author_id', 'isbn'] 
      }]
    });
    res.json(borrowings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});  

module.exports = router;