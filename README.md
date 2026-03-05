# Tino and Friends - MERN Stack Bakery Application

A complete MERN (MongoDB, Express, React, Node.js) stack e-commerce application for an artisan bakery with Stripe payment integration.

## Features

✨ **Core Features:**
- 🛒 Shopping cart functionality
- ❤️ Favorites/Wishlist system
- 👤 User authentication (Register & Login with JWT)
- 🔐 Secure password hashing (bcryptjs)
- 💳 Stripe credit/debit card payment integration
- 📦 Order management and history
- 🎨 Modern, responsive bakery-themed UI
- 🔍 Product search and filtering by category
- ⭐ Product ratings

**Product Categories:**
- Pastries
- Sandwiches
- Bread
- Beverages
- Viennoiserie

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Stripe React SDK** - Payment form
- **Context API** - State management
- **TailwindCSS** - Styling (via custom CSS)
- **React Icons** - Icon library

## Project Structure

```
Tino-and-Friends/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── favoritesController.js
│   │   └── orderController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── favoritesRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── scripts/
│   │   └── seedProducts.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Footer.js
    │   │   ├── ProductCard.js
    │   │   ├── CategoryFilter.js
    │   │   └── CartItem.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Menu.js
    │   │   ├── Cart.js
    │   │   ├── Favorites.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   └── Checkout.js
    │   ├── context/
    │   │   └── AppContext.js
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── Navbar.css
    │   │   ├── Footer.css
    │   │   ├── ProductCard.css
    │   │   ├── CategoryFilter.css
    │   │   ├── CartItem.css
    │   │   └── pages/
    │   │       ├── Home.css
    │   │       ├── Menu.css
    │   │       ├── Cart.css
    │   │       ├── Favorites.css
    │   │       ├── Auth.css
    │   │       └── Checkout.css
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    ├── package.json
    └── .env.example
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Stripe account (for payment processing)

### Step 1: Clone or Download the Project

```bash
cd Tino-and-Friends
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env
# Edit .env with your configuration
```

**Edit `backend/.env` with your credentials:**

```env
MONGODB_URI=mongodb://localhost:27017/tinoandfriendsdb
JWT_SECRET=your_super_secret_jwt_key_change_in_production
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Get Stripe Keys:**
1. Go to https://stripe.com and create a free account
2. Navigate to Dashboard → API keys
3. Copy your test keys and paste them in `.env`

### Step 3: Start MongoDB

**Using Local MongoDB:**
```bash
# Make sure MongoDB is running
mongod
```

**Or use MongoDB Atlas (Cloud):**
- Create a cluster at https://www.mongodb.com/cloud/atlas
- Update `MONGODB_URI` in `.env` with your connection string

### Step 4: Seed Sample Products

```bash
# From backend directory
npm run seed
```

This will create 25 sample products across all categories.

### Step 5: Start Backend Server

```bash
# From backend directory
npm run dev
```

Server will run on `http://localhost:5000`

### Step 6: Frontend Setup

```bash
# Open a new terminal
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
# Edit .env with Stripe key
```

**Edit `frontend/.env`:**

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### Step 7: Start Frontend Server

```bash
# From frontend directory
npm start
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get single product
- `GET /api/products/search?query=text` - Search products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Favorites
- `GET /api/favorites` - Get user favorites (protected)
- `POST /api/favorites/:productId` - Add to favorites (protected)
- `DELETE /api/favorites/:productId` - Remove from favorites (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/user` - Get user orders (protected)
- `GET /api/orders/:id` - Get order details (protected)
- `POST /api/orders/payment/create-checkout-session` - Create Stripe session (protected)
- `POST /api/orders/payment/verify` - Verify payment (protected)

## User Flow

### Customer Journey

1. **Browse Products**
   - Visit home page
   - Browse menu with category filters
   - Search for specific products

2. **Create Account**
   - Register with name, email, password
   - Automatic JWT token generation

3. **Shopping**
   - Add products to cart
   - Add products to favorites (requires login)
   - Update quantities in cart
   - Remove items from cart

4. **Checkout**
   - Enter shipping address
   - Proceed to Stripe payment
   - Secure card payment processing
   - Order confirmation

5. **Order History**
   - View past orders
   - Track order status

## Default Test Data

The application includes 25 sample products:

**Pastries (5 products)**
- Croissant, Pain au Chocolat, Danish Pastry, Almond Croissant, Éclair

**Sandwiches (5 products)**
- Turkey & Cheese, Prosciutto & Mozzarella, Grilled Chicken Club, Caprese, Roast Beef

**Bread (5 products)**
- Sourdough Loaf, Whole Wheat, Focaccia, Multigrain, Ciabatta Roll

**Beverages (5 products)**
- Espresso, Cappuccino, Iced Latte, Mocha, Orange Juice

**Viennoiserie (5 products)**
- Brioche Bun, Cinnamon Roll, Fruit Tart, Muffin, Donut

## Testing Payments

Use Stripe Test Cards:
- **4242 4242 4242 4242** - Success
- **4000 0000 0000 0002** - Decline

Any future date for expiry, any 3-digit CVC

## Security Features

✅ Password hashing with bcryptjs  
✅ JWT authentication tokens  
✅ Protected API routes  
✅ CORS configuration  
✅ Stripe PCI compliance  
✅ Environment variable configuration  
✅ Error handling and validation  

## Design Features

🎨 **Bakery Theme:**
- Warm gold and brown color palette
- Artisan aesthetics
- Professional gradient backgrounds
- Smooth transitions and hover effects
- Fully responsive design

## Styling

The application uses custom CSS with:
- CSS Grid and Flexbox layouts
- Responsive breakpoints
- Smooth animations
- Hover effects
- Mobile-first design

## Customization

### Change Colors
Edit root colors in `frontend/src/index.css`:
```css
:root {
  --primary-color: #d4a574;
  --secondary-color: #8b6f47;
  --accent-color: #c41e3a;
}
```

### Add More Products
Edit `backend/scripts/seedProducts.js` and run:
```bash
npm run seed
```

### Modify Product Schema
Edit `backend/models/Product.js` to add fields like `description`, `reviews`, etc.

## Troubleshooting

### Port Already in Use
```bash
# Change port in backend/.env or kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify credentials if using MongoDB Atlas

### Stripe Payment Issues
- Verify API keys in `.env` files
- Use test mode keys for development
- Check Stripe dashboard for webhooks

### CORS Errors
- Ensure `FRONTEND_URL` is correct in backend `.env`
- Check that frontend is running on correct port

## Performance Tips

1. Use MongoDB indexes for frequently searched fields
2. Implement pagination for large product lists
3. Cache product data on frontend
4. Optimize images for web
5. Use lazy loading for images

## Future Enhancements

- 📧 Email notifications for orders
- 🔄 Order status tracking in real-time
- 💬 Product reviews and ratings system
- 📱 Mobile app (React Native)
- 🎁 Discount codes and promotions
- 👨‍💼 Admin dashboard
- 📊 Analytics and reports
- 🔔 Push notifications
- 🗳️ Customer surveys

## Support

For issues or questions:
1. Check the API logs in terminal
2. Review MongoDB connection
3. Verify Stripe keys
4. Check browser console for frontend errors

## License

This project is open source and available for educational use.

---

**Created:** March 2024  
**Version:** 1.0.0  
**Bakery:** Tino and Friends 🍞❤️
