// models/Order.js - MongoDB Schema for Orders

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    }
  }],
  
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    phone: String
  },
  
  billingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  
  pricing: {
    subtotal: Number,
    tax: Number,
    shippingCost: Number,
    discount: {
      type: Number,
      default: 0
    },
    total: Number
  },
  
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
    required: true
  },
  
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  
  transactionId: String,
  
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    notes: String
  }],
  
  trackingNumber: String,
  
  notes: String,
  
  estimatedDelivery: Date,
  
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
  }
  
  // Initialize status history
  if (this.isNew) {
    this.statusHistory = [{
      status: this.orderStatus,
      timestamp: new Date(),
      notes: 'Order created'
    }];
  }
  
  this.updatedAt = new Date();
  next();
});

// Method to calculate total
orderSchema.methods.calculateTotal = function() {
  const subtotal = this.items.reduce((sum, item) => sum + item.subtotal, 0);
  this.pricing.subtotal = subtotal;
  this.pricing.total = subtotal + this.pricing.tax + this.pricing.shippingCost - this.pricing.discount;
  return this.pricing.total;
};

// Index for queries
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ orderStatus: 1 });

export default mongoose.model('Order', orderSchema);
