# Tino and Friends - Complete Setup Instructions

## Overview

This is a full-stack MERN application for an artisan bakery with e-commerce, authentication, and Stripe payment integration.

---

## 📋 Prerequisites

Before starting, ensure you have:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (local or cloud) - [Download](https://www.mongodb.com/try/download/community)
3. **Stripe Account** (free) - [Sign up](https://stripe.com)
4. **Text Editor** - VS Code recommended

---

## 🔑 Getting Stripe Keys (IMPORTANT)

1. Go to https://stripe.com
2. Click "Sign up"
3. Complete registration
4. Go to Dashboard → Developers → API Keys
5. Make sure you're in **Test Mode** (toggle on left)
6. You'll see two keys:
   - Publishable key (starts with `pk_test_`)
   - Secret key (starts with `sk_test_`)
7. **Save these values** - you'll need them in Step 4 and Step 6

---

## 📦 Installation Steps

### STEP 1: Set Up MongoDB

**Choose Option A or B:**

#### Option A: Local MongoDB (Windows)
```bash
# Download installer from https://www.mongodb.com/try/download/community
# Run installer and follow prompts
# Choose "Install MongoDB as a Service"
# Start MongoDB:
mongod
# Keep this terminal open - it's your database server
```

#### Option B: MongoDB Atlas (Cloud - Recommended)
```bash
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Sign up for free
# 3. Create a project
# 4. Create a cluster (select free tier)
# 5. Create a database user and password
# 6. Get connection string - it looks like:
# mongodb+srv://username:password@cluster.mongodb.net/tinoandfriendsdb
# Save this - you'll use it in Step 3
```

---

### STEP 2: Backend Installation

```bash
# Open Terminal/Command Prompt
# Navigate to backend directory
cd Tino-and-Friends/backend

# Install all dependencies
npm install

# Create environment file
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

---

### STEP 3: Configure Backend (.env file)

Open `backend/.env` in your text editor and fill in:

```env
# Database connection
MONGODB_URI=mongodb://localhost:27017/tinoandfriendsdb
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tinoandfriendsdb

# JWT Secret (use any random string - make it long)
JWT_SECRET=your_super_secret_key_make_it_long_and_random_12345

# Stripe Keys (from Step 0)
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE

# Server
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**❌ Don't share your .env file!**  
**✅ It's listed in .gitignore for safety**

---

### STEP 4: Seed Sample Products

```bash
# Still in backend directory
npm run seed

# Expected output:
# Cleared existing products
# 25 products created successfully
# Database connection closed
```

This creates 25 sample bakery products for testing.

---

### STEP 5: Start Backend Server

```bash
# Still in backend directory
npm run dev

# Expected output:
# MongoDB connected: localhost:27017
# Server running on port 5000
# ✅ Your backend is now running!

# Leave this terminal open
```

Test the backend:
- Open browser and go to: `http://localhost:5000/api/health`
- You should see: `{"message":"Server is running"}`

---

### STEP 6: Frontend Installation

Open a **NEW TERMINAL** (keep the first one running):

```bash
# Navigate to frontend directory
cd Tino-and-Friends/frontend

# Install dependencies
npm install

# Create environment file
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

---

### STEP 7: Configure Frontend (.env file)

Open `frontend/.env` and fill in:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api

# Stripe Public Key (from Step 0)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
```

**Note:** Only use the Publishable key here (the `pk_test_` one), NOT the secret key.

---

### STEP 8: Start Frontend Server

```bash
# Still in frontend directory
npm start

# Expected output:
# Compiled successfully!
# You can now view tino-and-friends-frontend in the browser.
# Local:            http://localhost:3000
```

The app will open automatically in your browser at `http://localhost:3000` ✅

---

## ✅ Verify Everything Works

### Terminal 1 (Backend) should show:
```
MongoDB connected: localhost:27017
Server running on port 5000
```

### Terminal 2 (Frontend) should show:
```
Compiled successfully!
You can now view tino-and-friends-frontend in the browser.
```

### Browser should show:
- Tino and Friends bakery website
- Hero section with features
- Categories
- Navigation bar with Home, Menu, Favorites, Cart

---

## 🧪 Test All Features

### 1. Create Account
1. Click "Sign Up" button
2. Enter: Name, Email, Password
3. Click "Sign Up"
4. ✅ You're now logged in

### 2. Browse Products
1. Click "Menu" in navbar
2. See products with images, prices, ratings
3. Click category buttons to filter
4. Use search bar to find products

### 3. Add to Cart
1. Hover over any product
2. Click "Add to Cart" button
3. See cart number in navbar increase
4. Go to Cart page
5. ✅ Your items are there

### 4. Add to Favorites
1. Click heart icon on products
2. Go to "Favorites" page
3. ✅ Favorited items appear

### 5. Test Checkout
1. Go to Cart
2. Click "Proceed to Checkout"
3. Fill in shipping address:
   - Street: 123 Main St
   - City: Springfield
   - State: IL
   - ZIP: 62701
   - Country: USA
4. Click "Proceed to Payment"
5. ✅ Redirected to Stripe

### 6. Test Stripe Payment
Use Stripe's test card:
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
```

1. Enter card details
2. Click "Pay"
3. ✅ Payment succeeds
4. Order created successfully

---

## 🐛 Troubleshooting

### "Cannot GET /api/health"
- Backend not running - run `npm run dev` in backend folder
- Wrong URL - check `http://localhost:5000/api/health`

### "Error: connect ECONNREFUSED"
- MongoDB not running
- Start mongod or check MongoDB Atlas connection
- Verify MONGODB_URI in .env

### "TypeError: fetch error"
- REACT_APP_API_URL wrong in frontend .env
- Should be: `http://localhost:5000/api`
- Restart frontend after changing .env

### "EADDRINUSE: address already in use"
- Port 5000 (backend) or 3000 (frontend) already in use
- Kill process or change PORT in .env
- Windows: `netstat -ano | findstr :5000`

### Stripe payment showing test/restricted
- Using Live keys instead of Test keys
- Go back to Stripe dashboard
- Make sure "Test Mode" toggle is ON
- Get keys from Test mode section

### "Products not showing"
- Run `npm run seed` to create sample products
- Check MongoDB connection is working

---

## 📁 Project Structure Explained

```
backend/
├── server.js           # Main server file
├── package.json        # Dependencies list
├── .env               # Your secret keys (DON'T SHARE!)
│
├── models/            # Data structure definitions
│   ├── User.js       # User data model
│   ├── Product.js    # Product data model
│   └── Order.js      # Order data model
│
├── controllers/       # Business logic
│   ├── authController.js      # Login/register
│   ├── productController.js   # Product operations
│   ├── favoritesController.js # Favorites logic
│   └── orderController.js     # Orders & payments
│
├── routes/           # API endpoints
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── favoritesRoutes.js
│   └── orderRoutes.js
│
└── middleware/       # Functions that run before routes
    ├── auth.js       # Check if user is logged in
    └── errorHandler.js

frontend/
├── src/
│   ├── App.js        # Main component
│   ├── index.js      # React entry point
│   │
│   ├── pages/        # Full page components
│   │   ├── Home.js      # Homepage
│   │   ├── Menu.js      # Product listing
│   │   ├── Cart.js      # Shopping cart
│   │   ├── Favorites.js # Wishlist
│   │   ├── Login.js     # Login page
│   │   ├── Register.js  # Signup page
│   │   └── Checkout.js  # Payment page
│   │
│   ├── components/   # Reusable UI pieces
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── ProductCard.js
│   │   ├── CartItem.js
│   │   └── CategoryFilter.js
│   │
│   ├── context/      # Shared state management
│   │   └── AppContext.js
│   │
│   ├── services/     # API communication
│   │   └── api.js
│   │
│   └── styles/       # CSS files
│       ├── *.css     # Component styles
│       └── pages/
│           └── *.css # Page styles
```

---

## 🔗 Important URLs

| Item | URL |
|------|-----|
| Frontend App | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| Stripe Dashboard | https://dashboard.stripe.com |
| MongoDB Compass | mongodb://localhost:27017 |

---

## 🚀 Next Steps

1. **Customize Colors**
   - Edit `frontend/src/index.css`
   - Change `--primary-color`, `--secondary-color`, `--accent-color`

2. **Add Your Products**
   - Edit `backend/scripts/seedProducts.js`
   - Run `npm run seed` again

3. **Customize Content**
   - Edit `frontend/src/pages/Home.js` for homepage
   - Edit company info in `Footer.js`

4. **Deploy to Production**
   - See `DEPLOYMENT.md` file

---

## 📞 Need Help?

Check these files:
- `README.md` - Full documentation
- `QUICKSTART.md` - Quick reference
- `DEPLOYMENT.md` - Production setup

---

## 🎉 You're All Set!

Your Tino and Friends bakery app is now running!

**Visit:** http://localhost:3000

Enjoy! 🍞❤️

---

## Quick Cheat Sheet

```bash
# Open 2 terminals

# Terminal 1 - Backend
cd Tino-and-Friends/backend
npm run dev

# Terminal 2 - Frontend  
cd Tino-and-Friends/frontend
npm start

# Both should show success messages
# Open http://localhost:3000 in browser
```

---

Last Updated: March 2024
