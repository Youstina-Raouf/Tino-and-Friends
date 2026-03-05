// Favorites Routes
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/favoritesController');

// All favorite routes require authentication
router.use(protect);

router.get('/', getFavorites);
router.post('/:productId', addFavorite);
router.delete('/:productId', removeFavorite);

module.exports = router;
