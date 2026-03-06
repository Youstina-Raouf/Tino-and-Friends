// Seed database with real Tino and Friends Menu - Complete Catalog
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/database');

const sampleProducts = [
  // VIENNOISERIE
  { name: 'Butter Croissant', description: 'Classic French buttery and flaky croissant', price: 90, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=500&fit=crop', available: true },
  { name: 'Zaatar Labneh Croissant', description: 'Croissant filled with traditional zaatar and creamy labneh', price: 100, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1549437115-46f04d026330?w=500&h=500&fit=crop', available: true },
  { name: 'Mix Cheese Croissant', description: 'Gourmet blend of artisan cheeses in flaky puff pastry', price: 120, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=500&fit=crop', available: true },
  { name: 'Crookie', description: 'Cookie-croissant hybrid with chocolate core', price: 150, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=500&fit=crop', available: true },
  { name: 'Almond Croissant', description: 'Bestseller: Double baked croissant with almond cream', price: 120, category: 'Viennoiserie', image: '/images/almond_croissant.png', available: true },
  { name: 'Raspberry Croissant', description: 'Sweet raspberry preserve filled pastry', price: 160, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=500&fit=crop', available: true },
  { name: 'Pain Pastrami & Do2a', description: 'Savory pastry with pastrami and traditional spices', price: 150, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1549437115-46f04d026330?w=500&h=500&fit=crop', available: true },
  { name: 'Pain Salami & Roasted Pepper', description: 'Italian salami and sweet peppers in puff pastry', price: 150, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1549437115-46f04d026330?w=500&h=500&fit=crop', available: true },
  { name: 'Pain Au Turkey', description: 'Artisanal pastry filled with premium turkey slices', price: 120, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1549437115-46f04d026330?w=500&h=500&fit=crop', available: true },
  { name: 'Pain Au Beef Bacon', description: 'Smoky beef bacon wrapped in buttery pastry layers', price: 120, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1549437115-46f04d026330?w=500&h=500&fit=crop', available: true },
  { name: 'Pain Suisse', description: 'Cream and chocolate chips in a rectangular pastry', price: 130, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop', available: true },
  { name: 'Cheesecake Danish Mix Berries', description: 'Danish pastry with cheesecake filling and forest berries', price: 180, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1608039891193-66d9c6d3e58e?w=500&h=500&fit=crop', available: true },
  { name: 'Gianduja Cruffin', description: 'Croissant-muffin hybrid with hazelnut gianduja', price: 150, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop', available: true },
  { name: 'Pistachio Kunafa Croissant - Milk', description: 'Fusion: Milky pistachio cream and kunafa topping', price: 180, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1549437115-46f04d026330?w=500&h=500&fit=crop', available: true },
  { name: 'Pistachio Kunafa Croissant - Dark', description: 'Fusion: Dark chocolate pistachio and kunafa topping', price: 180, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1549437115-46f04d026330?w=500&h=500&fit=crop', available: true },
  { name: 'Custard Croissant', description: 'Silky smooth custard cream filling', price: 120, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=500&fit=crop', available: true },
  { name: 'Mordjene Croissant', description: 'Signature pastry with rich decadent filling', price: 180, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=500&fit=crop', available: true },
  { name: 'Cinnamon Roll', description: 'Spiced cinnamon sugar spiral with glaze', price: 150, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1596592211029-b8e5566f0b92?w=500&h=500&fit=crop', available: true },
  { name: 'Flan', description: 'Traditional creamy custard tart individual portion', price: 60, category: 'Viennoiserie', image: 'https://images.unsplash.com/photo-1543158181-e6f9f678121d?w=500&h=500&fit=crop', available: true },

  // TARTS
  { name: 'Lemon Tart', description: 'Zesty lemon curd in crisp shortcrust shell', price: 100, category: 'Tarts', image: '/images/lemon_tart.png', available: true },
  { name: 'Pistachio Tart', description: 'Gourmet roasted pistachio cream in golden crust', price: 250, category: 'Tarts', image: '/images/pistachio_tart.png', available: true },
  { name: 'Strawberry Basil Tart', description: 'Artisanal strawberry and basil fusion', price: 130, category: 'Tarts', image: 'https://images.unsplash.com/photo-1464305795204-6f5bdf7f81b1?w=500&h=500&fit=crop', available: true },
  { name: 'Almond Cake Tart', description: 'Rustic almond cake base with pastry cream', price: 180, category: 'Tarts', image: 'https://images.unsplash.com/photo-1464305795204-6f5bdf7f81b1?w=500&h=500&fit=crop', available: true },

  // CHOUX
  { name: 'Hazelnut Paris - Brest', description: 'Classic choux with hazelnut praline', price: 180, category: 'Choux', image: 'https://images.unsplash.com/photo-1505394033313-442ed8fc442b?w=500&h=500&fit=crop', available: true },
  { name: 'Pistachio Eclair', description: 'Elegant choux with pistachio pastry cream', price: 150, category: 'Choux', image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=500&h=500&fit=crop', available: true },
  { name: 'Dark Chocolate Eclair', description: 'Classic eclair with premium dark cocoa', price: 120, category: 'Choux', image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=500&h=500&fit=crop', available: true },
  { name: 'Raspberry Eclair', description: 'Fruity eclair with raspberry infusion', price: 120, category: 'Choux', image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=500&h=500&fit=crop', available: true },

  // SALADS
  { name: 'Chicken Pesto Salad', description: 'Grilled chicken with basil pesto and fresh greens', price: 250, category: 'Salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop', available: true },
  { name: 'Peach & Goat Cheese Salad', description: 'Artisan salad with sweet peaches and tangy goat cheese', price: 250, category: 'Salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop', available: true },
  { name: 'Quinoa Salad', description: 'Protein-rich quinoa with mixed garden vegetables', price: 200, category: 'Salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop', available: true },
  { name: 'Chicken & Chili Honey', description: 'Sweet and spicy grilled chicken over seasonal greens', price: 220, category: 'Salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop', available: true },
  { name: 'Halloumi Salad', description: 'Grilled halloumi cheese with Mediterranean garnish', price: 240, category: 'Salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop', available: true },

  // INDIVIDUALS
  { name: 'Chocolate Caramel', description: 'Decadent chocolate layers with sea salt caramel', price: 250, category: 'Individuals', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&h=500&fit=crop', available: true },
  { name: 'Tiramisu Coffee Bean', description: 'Italian classic with rich espresso infusion', price: 120, category: 'Individuals', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&h=500&fit=crop', available: true },
  { name: 'Royale', description: 'Our signature royal chocolate and hazelnut cake', price: 250, category: 'Individuals', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&h=500&fit=crop', available: true },
  { name: 'Pistachio Fantasy', description: 'Exotic pistachio mousse with artisanal layers', price: 270, category: 'Individuals', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&h=500&fit=crop', available: true },

  // BEVERAGES
  { name: 'Espresso', description: 'Rich Italian espresso', price: 70, category: 'Beverages', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&h=500&fit=crop', available: true },
  { name: 'Macchiato', description: 'Espresso with frothy milk', price: 80, category: 'Beverages', image: 'https://images.unsplash.com/photo-1485182708500-e83c95c81bb6?w=500&h=500&fit=crop', available: true },
  { name: 'Spanish Latte', description: 'Creamy and sweet coffee favorite', price: 120, category: 'Beverages', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&h=500&fit=crop', available: true },
  { name: 'Matcha Frappe', description: 'Blended ceremonial grade matcha', price: 140, category: 'Beverages', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500&h=500&fit=crop', available: true },
  { name: 'Vimto Fusion', description: 'Signature artisanal mocktail', price: 150, category: 'Beverages', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&h=500&fit=crop', available: true },
  { name: 'Passion Fruit Smoothie', description: 'Tropical tangy passion fruit pulp', price: 120, category: 'Beverages', image: 'https://images.unsplash.com/photo-1589733901241-5e5da4bbefbb?w=500&h=500&fit=crop', available: true },

  // SANDWICHES
  { name: 'Turkey & Cheddar Onions Loaf', description: 'Smoked turkey and caramelized onions in sourdough', price: 180, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=500&fit=crop', available: true },
  { name: 'Smoked Salmon Bagel', description: 'Gourmet bagel with premium salmon and cream cheese', price: 250, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=500&fit=crop', available: true },
  { name: 'Bresaoia Truffle', description: 'Luxury cured beef with authentic truffle cream', price: 300, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=500&fit=crop', available: true }
];

async function seedDatabase() {
  try {
    await connectDB();
    await Product.deleteMany({});
    console.log('Cleared existing products');

    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`${createdProducts.length} final artisan menu items created successfully`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
