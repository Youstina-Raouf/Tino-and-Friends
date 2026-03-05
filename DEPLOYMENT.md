# Deployment Guide

## Deploying to Production

### Backend Deployment (Heroku)

1. **Create Heroku Account**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Prepare Backend**
   ```bash
   cd backend
   
   # Add Procfile
   echo "web: node server.js" > Procfile
   
   # Initialize git if needed
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Create and Deploy**
   ```bash
   heroku create your-bakery-api
   
   # Set environment variables
   heroku config:set MONGODB_URI=your_atlas_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set STRIPE_SECRET_KEY=your_key
   heroku config:set STRIPE_PUBLISHABLE_KEY=your_key
   heroku config:set FRONTEND_URL=your_frontend_url
   
   # Deploy
   git push heroku main
   ```

### Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Deploy**
   ```bash
   cd frontend
   npm install -g vercel
   vercel
   ```

3. **Configure Environment**
   - Add `.env.production`
   - Set `REACT_APP_API_URL` to your backend URL
   - Set `REACT_APP_STRIPE_PUBLISHABLE_KEY`

### Production Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Use Stripe LIVE keys (not test keys)
- [ ] Enable HTTPS
- [ ] Setup MongoDB backup
- [ ] Configure email notifications
- [ ] Add monitoring/logging
- [ ] Setup CI/CD pipeline
- [ ] Test payment in production mode
- [ ] Document deployment process

---

## Environment Variables Checklist

### Backend (.env)
```
MONGODB_URI=prod_mongo_uri
JWT_SECRET=strong_random_string_32_chars
STRIPE_SECRET_KEY=sk_live_key
STRIPE_PUBLISHABLE_KEY=pk_live_key
PORT=5000
FRONTEND_URL=https://yourdomain.com
NODE_ENV=production
```

### Frontend (.env.production)
```
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_key
```

---

## Performance Optimization

1. **Backend**
   - Enable MongoDB indexing
   - Implement caching
   - Use compression middleware
   - Monitor response times

2. **Frontend**
   - Minimize bundle size
   - Lazy load components
   - Optimize images
   - Enable code splitting

---

For more details, see README.md
