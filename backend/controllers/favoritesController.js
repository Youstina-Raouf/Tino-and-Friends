// Favorites Controller
const User = require('../models/User');

// Add product to favorites
exports.addFavorite = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    // Check if product is already in favorites
    const user = await User.findById(userId);

    if (user.favorites.includes(productId)) {
      return res.status(400).json({ message: 'Product already in favorites' });
    }

    user.favorites.push(productId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Product added to favorites',
      favorites: user.favorites,
    });
  } catch (error) {
    next(error);
  }
};

// Remove product from favorites
exports.removeFavorite = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user.favorites.includes(productId)) {
      return res.status(400).json({ message: 'Product not in favorites' });
    }

    user.favorites = user.favorites.filter(
      (fav) => fav.toString() !== productId
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Product removed from favorites',
      favorites: user.favorites,
    });
  } catch (error) {
    next(error);
  }
};

// Get user favorites
exports.getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');

    res.status(200).json({
      success: true,
      count: user.favorites.length,
      data: user.favorites,
    });
  } catch (error) {
    next(error);
  }
};
