// Seed database with sample products
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/database');

// Sample products data
const sampleProducts = [
  // Pastries
  {
    name: 'Croissant',
    description: 'Buttery, flaky French pastry perfect for breakfast',
    price: 4.99,
    category: 'Pastries',
    image: 'https://images.unsplash.com/photo-1585267360226-c684b42af31e?w=500&h=500&fit=crop',
    available: true,
    rating: 4.8,
  },
  {
    name: 'Pain au Chocolat',
    description: 'Chocolate-filled pastry with crispy layers',
    price: 5.49,
    category: 'Pastries',
    image: 'https://images.unsplash.com/photo-1571877227200-a0fb08ceae1d?w=500&h=500&fit=crop',
    available: true,
    rating: 4.9,
  },
  {
    name: 'Danish Pastry',
    description: 'Sweet twisted pastry with jam filling',
    price: 4.49,
    category: 'Pastries',
    image: 'https://images.unsplash.com/photo-1608039891193-66d9c6d3e58e?w=500&h=500&fit=crop',
    available: true,
    rating: 4.6,
  },
  {
    name: 'Almond Croissant',
    description: 'Croissant topped with sliced almonds and cream',
    price: 6.99,
    category: 'Pastries',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop',
    available: true,
    rating: 4.7,
  },
  {
    name: 'Éclair',
    description: 'Chocolate-covered choux pastry filled with cream',
    price: 5.99,
    category: 'Pastries',
    image: 'https://images.unsplash.com/photo-1571326491601-6d0c5f69b0d2?w=500&h=500&fit=crop',
    available: true,
    rating: 4.8,
  },

  // Sandwiches
  {
    name: 'Turkey & Cheese Sandwich',
    description: 'Fresh turkey breast with swiss cheese and vegetables',
    price: 8.99,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=500&fit=crop',
    available: true,
    rating: 4.5,
  },
  {
    name: 'Prosciutto & Mozzarella',
    description: 'Italian cured ham with fresh mozzarella and basil',
    price: 10.99,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop',
    available: true,
    rating: 4.7,
  },
  {
    name: 'Grilled Chicken Club',
    description: 'Grilled chicken with bacon, lettuce, and tomato',
    price: 9.99,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&h=500&fit=crop',
    available: true,
    rating: 4.6,
  },
  {
    name: 'Caprese Sandwich',
    description: 'Fresh tomato, mozzarella, basil, and balsamic vinegar',
    price: 8.49,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1528735602780-cf17fef3a4be?w=500&h=500&fit=crop',
    available: true,
    rating: 4.4,
  },
  {
    name: 'Roast Beef & Horseradish',
    description: 'Tender roast beef with horseradish cream sauce',
    price: 11.99,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=500&fit=crop',
    available: true,
    rating: 4.8,
  },

  // Bread
  {
    name: 'Sourdough Loaf',
    description: 'Artisan sourdough with perfect crust and tang',
    price: 6.99,
    category: 'Bread',
    image: 'https://images.unsplash.com/photo-1559162617-51c7f5f5e78b?w=500&h=500&fit=crop',
    available: true,
    rating: 4.9,
  },
  {
    name: 'Whole Wheat Bread',
    description: 'Hearty whole wheat loaf rich in fiber',
    price: 5.99,
    category: 'Bread',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop',
    available: true,
    rating: 4.6,
  },
  {
    name: 'Focaccia',
    description: 'Italian flat bread with olive oil and rosemary',
    price: 4.99,
    category: 'Bread',
    image: 'https://images.unsplash.com/photo-1596521307133-c0c9e19a05f5?w=500&h=500&fit=crop',
    available: true,
    rating: 4.7,
  },
  {
    name: 'Multigrain Loaf',
    description: 'Mix of grains and seeds for nutrition and taste',
    price: 6.49,
    category: 'Bread',
    image: 'https://images.unsplash.com/photo-1585594545971-9cefada70a66?w=500&h=500&fit=crop',
    available: true,
    rating: 4.5,
  },
  {
    name: 'Ciabatta Roll',
    description: 'Chewy Italian roll perfect for sandwiches',
    price: 3.49,
    category: 'Bread',
    image: 'https://images.unsplash.com/photo-1595854246482-f10dda510f21?w=500&h=500&fit=crop',
    available: true,
    rating: 4.4,
  },

  // Beverages
  {
    name: 'Espresso',
    description: 'Rich and bold single or double shot espresso',
    price: 3.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&h=500&fit=crop',
    available: true,
    rating: 4.7,
  },
  {
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and foam',
    price: 4.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=500&h=500&fit=crop',
    available: true,
    rating: 4.8,
  },
  {
    name: 'Iced Latte',
    description: 'Cold espresso with milk served over ice',
    price: 5.49,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba53e20?w=500&h=500&fit=crop',
    available: true,
    rating: 4.6,
  },
  {
    name: 'Mocha',
    description: 'Espresso with chocolate and steamed milk',
    price: 5.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
    available: true,
    rating: 4.9,
  },
  {
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 4.49,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=500&fit=crop',
    available: true,
    rating: 4.5,
  },

  // Viennoiserie
  {
    name: 'Brioche Bun',
    description: 'Soft, buttery sweet bun perfect with breakfast',
    price: 2.99,
    category: 'Viennoiserie',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop',
    available: true,
    rating: 4.6,
  },
  {
    name: 'Cinnamon Roll',
    description: 'Sweet spiral with cinnamon sugar filling',
    price: 4.99,
    category: 'Viennoiserie',
    image: 'https://images.unsplash.com/photo-1596592211029-b8e5566f0b92?w=500&h=500&fit=crop',
    available: true,
    rating: 4.9,
  },
  {
    name: 'Fruit Tart',
    description: 'Pastry tart with custard and fresh seasonal fruits',
    price: 6.99,
    category: 'Viennoiserie',
    image: 'https://images.unsplash.com/photo-1613949314800-dc4e5ad22f41?w=500&h=500&fit=crop',
    available: true,
    rating: 4.8,
  },
  {
    name: 'Muffin',
    description: 'Chocolate chip or berry muffin, moist and delicious',
    price: 3.99,
    category: 'Viennoiserie',
    image: 'https://images.unsplash.com/photo-1618569022181-b6300747ae11?w=500&h=500&fit=crop',
    available: true,
    rating: 4.5,
  },
  {
    name: 'Donut',
    description: 'Glazed donut or with sprinkles and fillings',
    price: 3.49,
    category: 'Viennoiserie',
    image: 'https://images.unsplash.com/photo-1612080567532-9c14c0c06d94?w=500&h=500&fit=crop',
    available: true,
    rating: 4.7,
  },
];

async function seedDatabase() {
  try {
    // Connect to database
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`${createdProducts.length} products created successfully`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
