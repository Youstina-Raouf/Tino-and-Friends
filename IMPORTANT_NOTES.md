# ⚡ IMPORTANT NOTES & QUICK REFERENCE

## Before You Start

### 1. Get Your Stripe Keys (5 minutes)
**This is CRITICAL - the app won't work without these!**

1. Go to https://stripe.com
2. Sign up for free
3. Go to Dashboard → Developers → API Keys
4. Make sure **Test Mode is ON** (toggle on the left)
5. You'll see two test keys:
   - `pk_test_...` (publishable - use in frontend)
   - `sk_test_...` (secret - use in backend)
6. Save these values

### 2. Database Setup
Choose ONE:
- **Local MongoDB:** Install from MongoDB.com, run `mongod`
- **MongoDB Atlas (Recommended):** Free cloud database at mongodb.com/cloud/atlas

### 3. Node.js Installation
- Download from nodejs.org (v14 or higher)
- Verify: `node --version` in terminal

---

## Installation Checklist

- [ ] Node.js installed
- [ ] Stripe test keys obtained
- [ ] MongoDB installed or Atlas account created
- [ ] Project folder created
- [ ] Backend npm install done
- [ ] Backend .env configured with keys
- [ ] Products seeded (`npm run seed`)
- [ ] Backend running on port 5000
- [ ] Frontend npm install done
- [ ] Frontend .env configured
- [ ] Frontend running on port 3000
- [ ] Able to create account and login
- [ ] Cart functionality working
- [ ] Stripe test payment working

---

## Environment Variables Reference

### backend/.env (MUST HAVE)
```
MONGODB_URI=mongodb://localhost:27017/tinoandfriendsdb
JWT_SECRET=any_random_string_here
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### frontend/.env (MUST HAVE)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
```

---

## Common Problems & Solutions

### Problem: "Cannot connect to MongoDB"
**Solution:**
- Make sure MongoDB is running (`mongod` in terminal)
- Or check MongoDB Atlas connection string
- Verify MONGODB_URI in backend/.env

### Problem: "Stripe payment not working"
**Solution:**
- Using LIVE keys instead of TEST keys
- Go back to Stripe, make sure Test Mode is ON
- Verify keys in both .env files
- Restart frontend after changing .env

### Problem: "Frontend shows blank page"
**Solution:**
- Check browser console for errors (F12)
- Verify REACT_APP_API_URL in frontend/.env
- Make sure backend is running on port 5000
- Check that backend.env variables are correct

### Problem: "Port already in use"
**Solution:**
```bash
# Find what's using port 5000 (Windows)
netstat -ano | findstr :5000

# Kill it
taskkill /PID [PID_NUMBER] /F

# For Mac/Linux
lsof -i :5000
kill -9 [PID]
```

### Problem: "npm install fails"
**Solution:**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again
- Make sure you have internet connection

---

## Terminal Commands Quick Reference

```bash
# Backend Setup
cd backend
npm install                    # Install dependencies
copy .env.example .env        # Create .env (Windows)
cp .env.example .env          # Create .env (Mac/Linux)

# Edit .env file with your keys, then:
npm run seed                  # Load sample products
npm run dev                   # Start development server
npm start                     # Start production server

# Frontend Setup
cd frontend
npm install                   # Install dependencies
copy .env.example .env        # Create .env (Windows)
cp .env.example .env          # Create .env (Mac/Linux)

# Edit .env file with your keys, then:
npm start                     # Start development server
npm run build                 # Build for production
```

---

## Stripe Test Cards

Use these in checkout to test payments:

| Card | Status | Details |
|------|--------|---------|
| 4242 4242 4242 4242 | Success | Any future expiry, any 3-digit CVC |
| 4000 0000 0000 0002 | Decline | Any future expiry, any 3-digit CVC |
| 4000 0000 0000 0077 | Require Auth | Use OTP: 123456 |

---

## Testing Checklist

### User Features
- [ ] Register new account
- [ ] Login with credentials
- [ ] Logout
- [ ] View profile
- [ ] Update profile

### Product Features
- [ ] View all products
- [ ] Filter by category
- [ ] Search products
- [ ] View product details
- [ ] Rate products

### Cart Features
- [ ] Add product to cart
- [ ] View cart
- [ ] Update quantity
- [ ] Remove from cart
- [ ] Clear cart
- [ ] Cart persists on page refresh

### Favorites Features
- [ ] Add to favorites (requires login)
- [ ] Remove from favorites
- [ ] View favorites page
- [ ] Favorites sync with account

### Checkout Features
- [ ] Go to checkout
- [ ] Fill shipping address
- [ ] See order summary
- [ ] Process Stripe payment
- [ ] Successful order creation
- [ ] Redirect to success page

### Design Features
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] Smooth animations
- [ ] Professional colors
- [ ] Images load properly

---

## File Locations

**Most Important Files to Know:**

1. `backend/server.js` - Backend starts here
2. `backend/.env` - Your secret keys go here
3. `frontend/src/App.js` - Frontend starts here
4. `frontend/.env` - Stripe key and API URL
5. `backend/routes/` - All API endpoints
6. `frontend/src/pages/` - All pages
7. `backend/scripts/seedProducts.js` - Sample products

---

## URLs to Remember

| What | URL |
|------|-----|
| Your App | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| Backend Health | http://localhost:5000/api/health |
| Stripe Dashboard | https://dashboard.stripe.com |
| MongoDB Compass | mongodb://localhost:27017 |

---

## After Everything Works

### Customization Ideas
1. **Colors** - Edit `frontend/src/index.css`
2. **Logo** - Update Navbar text in `frontend/src/components/Navbar.js`
3. **About Text** - Edit Footer in `frontend/src/components/Footer.js`
4. **Products** - Edit `backend/scripts/seedProducts.js`
5. **Homepage** - Edit `frontend/src/pages/Home.js`

### Deployment
- See `DEPLOYMENT.md` for production setup
- Backend can deploy to Heroku
- Frontend can deploy to Vercel

---

## Never Do This!

❌ Don't share your `.env` file (has secret keys)  
❌ Don't use LIVE Stripe keys for testing  
❌ Don't push `.env` to Git/GitHub  
❌ Don't use weak JWT_SECRET  
❌ Don't change database ports without updating .env  
❌ Don't forget to seed products before testing  

---

## Success Indicators

You'll know everything is working when:

✅ Terminal shows "Server running on port 5000"  
✅ Terminal shows "Compiled successfully!"  
✅ Browser opens to http://localhost:3000  
✅ You can create account
✅ You can see products and add to cart  
✅ Stripe test payment works  

---

## Documentation Files

Read these in order:

1. **SETUP_INSTRUCTIONS.md** ← START HERE (step-by-step)
2. **README.md** - Full technical documentation
3. **PROJECT_SUMMARY.md** - Overview of what's included
4. **QUICKSTART.md** - Quick reference
5. **DEPLOYMENT.md** - For production

---

## Need Help?

1. Check the terminal error messages - they're usually very helpful
2. Search in documentation files
3. Check browser console (F12)
4. Verify .env files have all required variables
5. Make sure both backends and frontend are running

---

## One More Thing!

**This is a complete, production-ready application.**

You don't need to write additional code. Just:
1. Follow setup instructions
2. Add your Stripe keys
3. Run the servers
4. Start using!

The application includes:
- ✅ Full backend API
- ✅ Complete React frontend
- ✅ Database setup
- ✅ Stripe integration
- ✅ User authentication
- ✅ Shopping cart
- ✅ Order management
- ✅ Beautiful UI
- ✅ 25 sample products
- ✅ All documentation

**Everything is ready to go! 🚀**

---

Last Updated: March 2024  
Questions? Check the documentation files above!
