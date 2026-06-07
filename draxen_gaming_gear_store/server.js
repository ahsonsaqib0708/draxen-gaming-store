import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const STORE_EMAIL = process.env.STORE_EMAIL || process.env.SMTP_USER || 'ahsonsaqib0708@gmail.com';

const products = [
  {
    id: 'gambit-pro-keyboard',
    name: 'Gambit Pro Keyboard',
    slug: 'gambit-pro-keyboard',
    category: 'keyboards',
    description: 'Low-latency mechanical keyboard with per-key RGB lighting, hot-swap switches, and tournament-ready build quality.',
    price: 189.99,
    originalPrice: 229.99,
    rating: { average: 4.9, count: 128 },
    stock: 18,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOdn5gbVU-t_QOQ-DuDzTpTgK-8pxSQzuxlmkLrN4_7SRR3NMN9Mt3L1SbUjm-528ooRzrBNgxC9jr_T9L7v8UgX_pO6V7sRWnrZGwkV5iLdpbAzVq_taEpya5__k_qc3qyodTjPAMyJmNI3_pfZQJVuraNETC1o6Loq7TEM-0G4ATUpvhqUPwNmGckRPw-GKfzXrxdkqcjzHfkjGf4f48HRr1zi_7wVnv0FOiLAihUxIza9NXQuUJYL6BjnSzsJHGDLe_jgr_6rw',
    tags: ['featured', 'rgb']
  },
  {
    id: 'phantom-x7-headset',
    name: 'Phantom X7',
    slug: 'phantom-x7-headset',
    category: 'headphones',
    description: 'Wireless 7.1 spatial audio headset with breathable memory foam, noise-isolating microphone, and all-night battery life.',
    price: 249.99,
    originalPrice: 299.99,
    rating: { average: 5, count: 94 },
    stock: 11,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyIbrzrT5AUHaM8al4e8q9Lra1G5cNP2mYj3F3Y20-9eQSOK2qvDpkr5Dcw2PtJfiSJzbihKjSZSyJr8CwPiIH69oEPZ36U9jzf-Ap8nYhOIarLpN9YhAgqpv1DKK2k9G1XZRWlOmXN7XENNOHGXYsCrVmcoXQ74AKHepXMvE7cIAfM4xf9pF7hYiMLO0Cn5qNBMThs6mFzwAA6kvZ1DJLsMGVkkydxL29x00btYW5MhYhqoyg8IyTNKC_-brIOWRyd-CkTqMWN-s',
    tags: ['featured', 'wireless']
  },
  {
    id: 'nexus-reactor-pc',
    name: 'NEXUS Reactor',
    slug: 'nexus-reactor-pc',
    category: 'custom-pc',
    description: 'Liquid-cooled custom gaming PC tuned for high-refresh esports, streaming, and demanding creative workloads.',
    price: 3499,
    originalPrice: 3899,
    rating: { average: 4.8, count: 12 },
    stock: 4,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLsoF2Yxk-0wBfpE-bRUpcIdby3S2bLDj7BR1ZZqsz2eNk55hKuLPSbupGBckUcltL_TuzKpLpejlP31025pwvxDt7YTKtDwuP8kMTF6_AHV7fLacjzKpLfgb8GcuFkfVHJKws2nsKh4Kh5pE0JrVSI-FAAXgB6wSbuG5euCi5puLKerF0eyuGby53m9BHiB7C3NS_4xDNDw3Tj51nA9BiFf_qDx4IFtM9BNZCsSVuFZQQnfF9tWhsgs6mw',
    tags: ['featured', 'custom']
  },
  {
    id: 'rgb-light-bars',
    name: 'RGB Ambient Light Bars',
    slug: 'rgb-light-bars',
    category: 'accessories',
    description: 'Vertical RGB light bars with soft neon diffusion for immersive desk setups and streaming backgrounds.',
    price: 89.99,
    originalPrice: 119.99,
    rating: { average: 4.7, count: 67 },
    stock: 25,
    image: null,
    tags: ['lighting', 'accessories']
  }
];

const categories = [
  { id: 1, name: 'Headphones', slug: 'headphones' },
  { id: 2, name: 'Keyboards', slug: 'keyboards' },
  { id: 3, name: 'Custom PCs', slug: 'custom-pc' },
  { id: 4, name: 'Accessories', slug: 'accessories' },
  { id: 5, name: 'CPUs', slug: 'cpus' },
  { id: 6, name: 'Motherboards', slug: 'motherboards' },
  { id: 7, name: 'RAM', slug: 'ram' },
  { id: 8, name: 'Power Supplies', slug: 'psu' },
  { id: 9, name: 'PC Cases', slug: 'cases' }
];

const orders = [];
const contacts = [];

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(cors({
  origin: process.env.CORS_ORIGIN || true,
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false
}));

app.use(express.static(__dirname, {
  extensions: ['html'],
  maxAge: NODE_ENV === 'production' ? '1h' : 0
}));

function money(value) {
  return Number.parseFloat(value || 0).toFixed(2);
}

function getTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;

  return nodemailer.createTransport({
    service: process.env.SMTP_SERVICE || 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

async function sendStoreEmail({ subject, text, replyTo }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn(`Email skipped: ${subject}. Configure SMTP_USER and SMTP_PASS to enable mail.`);
    return { sent: false, reason: 'SMTP is not configured' };
  }

  await transporter.sendMail({
    from: `"DRAXEN Gaming" <${process.env.SMTP_USER}>`,
    to: STORE_EMAIL,
    replyTo,
    subject,
    text
  });

  return { sent: true };
}

function requireFields(body, fields) {
  return fields.filter((field) => !String(body[field] || '').trim());
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    emailConfigured: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS)
  });
});

app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  let result = [...products];

  if (category) {
    result = result.filter((product) => product.category === category);
  }

  if (search) {
    const query = String(search).toLowerCase();
    result = result.filter((product) =>
      [product.name, product.description, product.category, ...(product.tags || [])]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }

  res.json({ products: result });
});

app.get('/api/products/:slug', (req, res) => {
  const product = products.find((item) => item.slug === req.params.slug || item.id === req.params.slug);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  return res.json({ product });
});

app.get('/api/categories', (req, res) => {
  res.json({ categories });
});

app.post('/api/contact', async (req, res, next) => {
  try {
    const missing = requireFields(req.body, ['name', 'email', 'message']);
    if (missing.length) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
    }

    const contact = {
      id: `MSG-${Date.now()}`,
      name: String(req.body.name).trim(),
      email: String(req.body.email).trim(),
      topic: String(req.body.topic || 'general').trim(),
      message: String(req.body.message).trim(),
      createdAt: new Date().toISOString()
    };

    contacts.push(contact);

    const emailResult = await sendStoreEmail({
      subject: `DRAXEN contact: ${contact.topic}`,
      replyTo: contact.email,
      text: [
        `New message from ${contact.name}`,
        `Email: ${contact.email}`,
        `Topic: ${contact.topic}`,
        '',
        contact.message
      ].join('\n')
    });

    return res.status(201).json({ ok: true, contactId: contact.id, email: emailResult });
  } catch (err) {
    return next(err);
  }
});

app.post('/api/orders', async (req, res, next) => {
  try {
    const missing = requireFields(req.body, ['name', 'email', 'phone', 'address', 'city']);
    if (missing.length) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
    }

    if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    const items = req.body.items.map((item) => {
      const product = products.find((entry) => entry.id === item.id || entry.slug === item.slug);
      if (!product) {
        const err = new Error(`Unknown product: ${item.id || item.slug}`);
        err.status = 400;
        throw err;
      }

      const quantity = Math.max(1, Number.parseInt(item.quantity, 10) || 1);
      return {
        id: product.id,
        name: product.name,
        quantity,
        price: product.price,
        subtotal: Number((product.price * quantity).toFixed(2))
      };
    });

    const subtotal = Number(items.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2));
    const tax = Number((subtotal * 0.07).toFixed(2));
    const shipping = subtotal >= 150 ? 0 : 12.99;
    const total = Number((subtotal + tax + shipping).toFixed(2));

    const order = {
      id: `DRX-${Date.now()}`,
      customer: {
        name: String(req.body.name).trim(),
        email: String(req.body.email).trim(),
        phone: String(req.body.phone).trim()
      },
      shipping: {
        address: String(req.body.address).trim(),
        city: String(req.body.city).trim(),
        postalCode: String(req.body.postalCode || '').trim()
      },
      paymentMethod: String(req.body.paymentMethod || 'cod'),
      items,
      pricing: { subtotal, tax, shipping, total },
      status: 'received',
      createdAt: new Date().toISOString()
    };

    orders.push(order);

    const emailResult = await sendStoreEmail({
      subject: `New DRAXEN order ${order.id}`,
      replyTo: order.customer.email,
      text: [
        `Order: ${order.id}`,
        `Customer: ${order.customer.name}`,
        `Email: ${order.customer.email}`,
        `Phone: ${order.customer.phone}`,
        `Address: ${order.shipping.address}, ${order.shipping.city} ${order.shipping.postalCode}`,
        `Payment: ${order.paymentMethod}`,
        '',
        'Items:',
        ...order.items.map((item) => `- ${item.name} x${item.quantity}: $${money(item.subtotal)}`),
        '',
        `Subtotal: $${money(order.pricing.subtotal)}`,
        `Tax: $${money(order.pricing.tax)}`,
        `Shipping: $${money(order.pricing.shipping)}`,
        `Total: $${money(order.pricing.total)}`
      ].join('\n')
    });

    return res.status(201).json({ ok: true, order, email: emailResult });
  } catch (err) {
    return next(err);
  }
});

app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not Found', path: req.path });
  }

  return res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(err);
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    ...(NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`DRAXEN Gaming Store running at http://localhost:${PORT}`);
});

export default app;
