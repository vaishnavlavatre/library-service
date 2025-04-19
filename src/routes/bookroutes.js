// src/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single book by ID
router.get('/:book_id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.book_id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new book
router.post('/', async (req, res) => {
  try {
    const newBook = await Book.create({
      title: req.body.title,
      isbn: req.body.isbn,
      quantity_available: req.body.quantity_available,
      author_id: req.body.author_id,
      category_id: req.body.category_id
    });
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a book
router.put('/:book_id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.book_id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.update(req.body);
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a book
router.delete('/:book_id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.book_id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.destroy();
    res.status(204).send(); // 204 = No Content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // Export the router