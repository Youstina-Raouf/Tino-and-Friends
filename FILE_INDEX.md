# 📑 Complete File Index & Navigation Guide

## 📖 Documentation Files (Read These First!)

Start here for setup and understanding the project:

1. **`SETUP_INSTRUCTIONS.md`** ⭐ START HERE
   - Complete step-by-step setup guide
   - Pictures of what to expect
   - Troubleshooting for common issues
   - Testing checklist

2. **`IMPORTANT_NOTES.md`** 
   - Environment variables reference
   - Common problems & solutions
   - Testing checklist
   - Stripe test cards
   - Never-do list

3. **`README.md`**
   - Full project documentation
   - Feature list
   - API endpoints reference
   - User flow explanation
   - Customization guide

4. **`PROJECT_SUMMARY.md`**
   - Project overview
   - What's included
   - File structure
   - Statistics
   - Tech stack details

5. **`QUICKSTART.md`**
   - Quick reference guide
   - 5-minute quick start
   - Command reference
   - Common commands

6. **`DEPLOYMENT.md`**
   - Production deployment
   - Heroku setup
   - Vercel setup
   - Environment variables
   - Optimization tips

---

## 🏗️ Backend Files Structure

### Root Backend Files
```
backend/
├── server.js              - Main server entry point, starts Express app
├── package.json           - Dependencies list and scripts
├── .env.example          - Template for .env (copy and fill with your keys)
└── .gitignore            - Files to ignore in git
```

### Configuration
```
backend/config/
└── database.js           - MongoDB connection setup with Mongoose
```

### Models (Database Schemas)
```
backend/models/
├── User.js               - User schema: name, email, password, favorites, orders
├── Product.js            - Product schema: name, price, image, category, rating
└── Order.js              - Order schema: products, total, payment status, address
```

### Controllers (Business Logic)
```
backend/controllers/
├── authController.js     - Register, login, profile, authentication logic
├── productController.js  - Get products, search, filter by category
├── favoritesController.js - Add/remove/get user favorites
└── orderController.js    - Create orders, process Stripe payments
```

### Routes (API Endpoints)
```
backend/routes/
├── authRoutes.js         - /api/auth/* endpoints
├── productRoutes.js      - /api/products/* endpoints
├── favoritesRoutes.js    - /api/favorites/* endpoints
└── orderRoutes.js        - /api/orders/* and /api/payment/* endpoints
```

### Middleware (Functions that run before routes)
```
backend/middleware/
├── auth.js               - JWT verification, protect routes
└── errorHandler.js       - Error handling for all routes
```

### Scripts (Utilities)
```
backend/scripts/
└── seedProducts.js       - Creates 25 sample products in database
```

---

## 🎨 Frontend Files Structure

### Root Frontend Files
```
frontend/
├── package.json          - Dependencies list and scripts
├── .env.example         - Template for .env (copy and fill)
└── .gitignore           - Files to ignore in git
```

### Public Assets
```
frontend/public/
└── index.html           - HTML template for React to load into
```

### Source Code
```
frontend/src/
├── App.js               - Main app component with routing
├── index.js             - React entry point
└── index.css            - Global styles and color variables
```

### Page Components (Full Pages)
```
frontend/src/pages/
├── Home.js              - Homepage with hero, features, categories
├── Menu.js              - Product listing with search and filters
├── Cart.js              - Shopping cart with checkout button
├── Favorites.js         - User's favorite products
├── Login.js             - Login form and authentication
├── Register.js          - Registration form and account creation
└── Checkout.js          - Shipping address and Stripe payment form
```

### Reusable Components
```
frontend/src/components/
├── Navbar.js            - Header with navigation and cart badge
├── Footer.js            - Footer with links and contact info
├── ProductCard.js       - Individual product display card
├── CartItem.js          - Product in shopping cart
├── CategoryFilter.js    - Category selection buttons
└── ProtectedRoute.js    - Route wrapper for protected pages
```

### Context (State Management)
```
frontend/src/context/
└── AppContext.js        - Global state (user, cart, auth)
                           Provides cart functions and user data
```

### Services (API Communication)
```
frontend/src/services/
└── api.js               - Axios configuration and API functions
                           All backend communication happens here
```

### Styling
```
frontend/src/styles/
├── Navbar.css           - Navigation bar styling
├── Footer.css           - Footer styling
├── ProductCard.css      - Product card styling
├── CategoryFilter.css   - Category buttons styling
├── CartItem.css         - Cart item styling
└── pages/
    ├── Home.css         - Homepage styling
    ├── Menu.css         - Menu page styling
    ├── Cart.css         - Cart page styling
    ├── Favorites.css    - Favorites page styling
    ├── Auth.css         - Login/Register styling
    └── Checkout.css     - Checkout page styling
```

---

## 🔗 How Files Connect

### User Registration Flow
1. User goes to `pages/Register.js`
2. Form submits to `services/api.js` → `authService.register()`
3. API call goes to `backend/routes/authRoutes.js`
4. Controller `controllers/authController.js` handles it
5. Data saved to `models/User.js` in MongoDB
6. Token stored in `context/AppContext.js`
7. User logged in and redirected

### Product Display Flow
1. `pages/Menu.js` loads
2. Calls `services/api.js` → `productService.getProducts()`
3. API call to `backend/routes/productRoutes.js`
4. Controller `controllers/productController.js` queries `models/Product.js`
5. Data fetched from MongoDB
6. Returns to frontend and displayed via `components/ProductCard.js`

### Shopping Cart Flow
1. User clicks "Add to Cart" on `components/ProductCard.js`
2. Calls `context/AppContext.js` → `addToCart()`
3. Cart state updated and saved to localStorage
4. Cart badge updates in `components/Navbar.js`
5. User views cart in `pages/Cart.js`
6. Shows items via `components/CartItem.js`

### Stripe Payment Flow
1. User goes to `pages/Checkout.js`
2. Fills shipping address
3. Submits to `services/api.js` → `orderService.createCheckoutSession()`
4. Backend creates Stripe session in `controllers/orderController.js`
5. Redirects to Stripe
6. User enters card (test card: 4242 4242 4242 4242)
7. Payment processed by Stripe
8. Backend verifies payment and creates `Order` in MongoDB
9. User sees success message

---

## 📊 File Statistics

| Category | Files | Purpose |
|----------|-------|---------|
| Documentation | 6 | Setup guides, README, deployment |
| Backend Config | 2 | Database and environment |
| Backend Models | 3 | Database schemas |
| Backend Controllers | 4 | Business logic |
| Backend Routes | 4 | API endpoints |
| Backend Middleware | 2 | Auth, error handling |
| Backend Scripts | 1 | Sample data |
| Frontend Pages | 7 | Full-page components |
| Frontend Components | 6 | Reusable UI pieces |
| Frontend Context | 1 | State management |
| Frontend Services | 1 | API communication |
| Frontend Styles | 11 | CSS files |
| Frontend Assets | 1 | HTML template |
| Config Files | 6 | .env, .gitignore, package.json |
| **TOTAL** | **58** | **Complete application** |

---

## 🔍 Finding What You Need

### "How do I change the colors?"
→ Open `frontend/src/index.css` and edit CSS variables

### "How do I add more products?"
→ Edit `backend/scripts/seedProducts.js` and run `npm run seed`

### "How do I add a new API endpoint?"
→ Create route in `backend/routes/`, controller in `backend/controllers/`

### "How do I add a new page?"
→ Create file in `frontend/src/pages/`, add route in `frontend/src/App.js`

### "How do I change the navbar?"
→ Edit `frontend/src/components/Navbar.js` and `frontend/src/styles/Navbar.css`

### "How do I get Stripe working?"
→ Follow `SETUP_INSTRUCTIONS.md` Step 0 to get keys, then add to `.env` files

### "What database queries are there?"
→ Check `backend/models/` for schemas and `backend/controllers/` for queries

### "How is the app styled?"
→ CSS files in `frontend/src/styles/` - custom CSS, no frameworks needed

### "How do I deploy?"
→ See `DEPLOYMENT.md` for Heroku and Vercel instructions

---

## ✅ Verification Checklist

Use this to verify all parts are working:

**Backend Files**
- [ ] `server.js` starts with `npm run dev`
- [ ] `config/database.js` connects to MongoDB
- [ ] `models/` schemas define data structure
- [ ] `controllers/` have API logic
- [ ] `routes/` have all endpoints
- [ ] `middleware/` protect routes with JWT

**Frontend Files**
- [ ] `App.js` loads all pages
- [ ] `pages/` all render correctly
- [ ] `components/` display properly
- [ ] `context/AppContext.js` manages state
- [ ] `services/api.js` connects to backend
- [ ] `styles/` CSS looks good

**Data Flow**
- [ ] Register/Login works
- [ ] Products display
- [ ] Cart functions
- [ ] Favorites save
- [ ] Stripe payment works
- [ ] Orders saved to database

---

## 🚀 Quick Command Reference

```bash
# Backend Commands
cd backend
npm install              # Install
npm run seed            # Load products
npm run dev             # Start dev server
npm start               # Start prod server

# Frontend Commands
cd frontend
npm install             # Install
npm start               # Start dev server
npm run build           # Build production

# MongoDB
mongod                  # Start local MongoDB
```

---

## 📝 File Dependencies

Most Important Files to Understand:

1. **`backend/server.js`** - Everything starts here
2. **`frontend/src/App.js`** - Everything starts here
3. **`backend/models/User.js`** - User data structure
4. **`backend/models/Product.js`** - Product data structure
5. **`frontend/src/context/AppContext.js`** - App state
6. **`frontend/src/services/api.js`** - API communication

---

## 🎯 Development Tips

**When adding new features:**
1. Backend: Create model, controller, routes
2. Frontend: Create page/component, add styling
3. Connect via `services/api.js`
4. Test with sample data

**When debugging:**
1. Check terminal for backend errors
2. Check browser console (F12) for frontend errors
3. Check `.env` files are correct
4. Verify MongoDB is running
5. Check API is receiving requests

**When styling:**
1. Edit `.css` files in `styles/` folder
2. Use existing color variables from `index.css`
3. Mobile-first approach in media queries
4. Test on different screen sizes

---

## 📚 Learn More

Each file has comments explaining the code. Read them!

Key files to read first:
- `backend/server.js` - Understand how Express is set up
- `frontend/src/App.js` - Understand page routing
- `backend/controllers/authController.js` - See how login works
- `frontend/src/context/AppContext.js` - See how state works

---

## 🎉 You're All Set!

You now have a complete map of the entire application. 

**Start with:** `SETUP_INSTRUCTIONS.md`

**Questions?** Check this file, then the documentation files.

**Happy coding! 🍞❤️**
