# DRAXEN Gaming Store

Premium gaming equipment, custom PC builds, and gaming accessories.

## 🚀 Quick Start (Local Development)

```bash
cd draxen_gaming_gear_store
npm install
npm start
```

Open http://localhost:5000

## 🌐 Deployment

### Option 1: Vercel (Recommended - Free)

1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Import the `draxen-gaming-store` repository
4. **Set Root Directory to `draxen_gaming_gear_store`**
5. Click Deploy

The `vercel.json` file is already configured. If you see "DEPLOYMENT_NOT_FOUND" error:
- Go to Vercel Dashboard → Your Project → Settings → General
- Verify the "Root Directory" is set to `draxen_gaming_gear_store`
- Click "Redeploy" from the Deployments tab

### Option 2: Netlify

```bash
cd draxen_gaming_gear_store
netlify deploy --prod
```

### Option 3: Railway / Render

1. Connect the GitHub repository
2. Set root directory to `draxen_gaming_gear_store`
3. Set start command to `npm start`
4. Set port to 5000

## ⚙️ Environment Variables (Optional - for email)

Create a `.env` file in the `draxen_gaming_gear_store` directory:

```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
STORE_EMAIL=ahsonsaqib0708@gmail.com
```

Without these, the contact form will still work but emails will only be logged to the server console.

## 🛠️ Tech Stack

- Node.js + Express
- TailwindCSS (CDN)
- Vanilla JavaScript
- Static HTML pages

## 📁 Project Structure

```
draxen_gaming_gear_store/
├── server.js              # Express server
├── shared.js              # Shared frontend cart logic
├── vercel.json            # Vercel deployment config
├── package.json           # Dependencies
├── index.html             # Homepage
├── about.html             # About page
├── contact.html           # Contact page (with form)
├── community.html         # Community page
├── cart.html              # Shopping cart
├── checkout.html          # Checkout
├── privacy.html           # Privacy policy
├── terms.html             # Terms of service
├── 404.html               # 404 error page
├── accessories.html       # Accessories shop
├── pc-parts.html          # PC parts
├── custom-pc.html         # Custom PC builds
├── product-details.html   # Product details
├── config/                # Backend config
├── controllers/           # API controllers
├── models/                # Data models
└── routes/                # API routes
```

## 🔧 API Endpoints

- `GET /api/products` - List all products
- `GET /api/products/:slug` - Get single product
- `GET /api/categories` - List categories
- `POST /api/contact` - Submit contact form
- `POST /api/orders` - Place an order
- `GET /health` - Health check

## 🐛 Troubleshooting Deployment Issues

### "DEPLOYMENT_NOT_FOUND" on Vercel

1. Vercel Dashboard → Select the project
2. Settings → General
3. **Root Directory** → Set to `draxen_gaming_gear_store`
4. Save and go to Deployments tab
5. Click the three dots on the latest deployment → Redeploy

### Build Fails on Vercel

Make sure `package.json` has correct scripts:
```json
"scripts": {
  "start": "node server.js"
}
```

### Contact Form Not Working

- Check that `/api/contact` endpoint is accessible
- Look at the Vercel function logs for errors
- SMTP emails are optional - the form still saves to memory if SMTP not configured
