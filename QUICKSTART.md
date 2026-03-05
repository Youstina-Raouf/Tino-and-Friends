# Quick Start Guide - Tino and Friends

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js installed (v14+)
- MongoDB (local or Atlas)
- Stripe account (free)

---

## STEP 1: Setup Stripe Keys (2 minutes)

1. Go to **https://stripe.com**
2. Sign up for free account
3. Go to **Dashboard → API Keys**
4. Copy your **Test Keys** (not Live)
5. Save them for Step 4 and 5

---

## STEP 2: Setup MongoDB (2 minutes)

**Option A: Local MongoDB**
```bash
# Download and install from https://www.mongodb.com/try/download/community
# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to **https://www.mongodb.com/cloud/atlas**
2. Create free account → Create cluster
3. Copy connection string
4. Replace username/password in string

---

## STEP 3: Start Backend

```bash
# Terminal 1
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file and add:
MONGODB_URI=mongodb://localhost:27017/tinoandfriendsdb
JWT_SECRET=my_secret_key_12345
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
PORT=5000
FRONTEND_URL=http://localhost:3000

# Seed sample products
npm run seed

# Start server
npm run dev
```

Expected output: `Server running on port 5000` ✅

---

## STEP 4: Start Frontend

```bash
# Terminal 2 (new terminal)
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file and add:
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE

# Start development server
npm start
```

Expected output: Application opens at `http://localhost:3000` ✅

---

## Testing the Application

### 1. Create Account
- Click "Sign Up"
- Enter name, email, password
- Account created with JWT token

### 2. Browse Products
- Visit Menu
- Filter by category
- Search for products
- Ratings displayed

### 3. Add to Cart
- Click product
- Click "Add to Cart"
- Cart updates in navbar

### 4. Add to Favorites
- Must be logged in
- Click heart icon
- Appears in Favorites page

### 5. Test Checkout
- Go to Cart
- Click "Proceed to Checkout"
- Fill shipping address
- Click "Proceed to Payment"

### 6. Test Stripe Payment
- Use test card: **4242 4242 4242 4242**
- Expiry: any future date
- CVC: any 3 digits
- Click "Pay"

### 7. Order History
- Login
- Visit Profile to see orders

---

## Sample Products

25 products pre-loaded across categories:

| Category | Count | Examples |
|----------|-------|----------|
| Pastries | 5 | Croissant, Pain au Chocolat |
| Sandwiches | 5 | Turkey & Cheese, Prosciutto |
| Bread | 5 | Sourdough, Whole Wheat |
| Beverages | 5 | Espresso, Cappuccino |
| Viennoiserie | 5 | Cinnamon Roll, Muffin |

---

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill the process
taskkill /PID [PID] /F

# Restart
npm run dev
```

### MongoDB connection error
- Verify MongoDB is running
- Check connection string
- If using Atlas, whitelist your IP

### Stripe payment not working
- Verify keys in .env files
- Check they're TEST keys not LIVE
- Use correct test card number

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in .env
- Verify CORS in backend/server.js

---

## Project URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **MongoDB:** mongodb://localhost:27017/tinoandfriendsdb

---

## Common Commands

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev         # Start development server
npm run seed        # Seed sample products
npm start           # Start production server

# Frontend
cd frontend
npm install         # Install dependencies
npm start           # Start development server
npm run build       # Build for production
```

---

## API Testing

Test API with Postman or curl:

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"123456"}'

# Get products
curl http://localhost:5000/api/products

# Get products by category
curl http://localhost:5000/api/products/category/Pastries
```

---

## Database Schema

### User
- name, email, password (hashed)
- favorites (array of Product IDs)
- orderHistory (array of Order IDs)

### Product
- name, description, price, category
- image URL, available, rating

### Order
- userId, products array
- totalPrice, paymentStatus, orderStatus
- shippingAddress, stripePaymentId

---

## Support

**Backend Issues?**
- Check terminal for error messages
- Verify .env variables
- Check MongoDB connection
- Review server logs

**Frontend Issues?**
- Check browser console (F12)
- Verify API URL
- Check Stripe key in .env
- Clear cache if needed

---

## Next Steps

1. ✅ Setup complete!
2. Test all features
3. Customize bakery colors
4. Add your products
5. Deploy to production (Heroku, Vercel, etc.)

---

Happy baking! 🍞❤️
