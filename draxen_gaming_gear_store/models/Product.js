// models/Product.js - MongoDB Schema for Products

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
    minlength: [3, 'Product name must be at least 3 characters']
  },
  
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    index: true
  },
  
  description: {
    type: String,
    required: [true, 'Product description is required'],
    minlength: [50, 'Description should be at least 50 characters'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  
  category: {
    type: String,
    required: true,
    enum: ['headphones', 'keyboards', 'cpus', 'motherboards', 'ram', 'psu', 'cases', 'accessories']
  },
  
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
    set: val => parseFloat(val.toFixed(2))
  },
  
  originalPrice: {
    type: Number,
    set: val => val ? parseFloat(val.toFixed(2)) : null
  },
  
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  specifications: {
    type: Map,
    of: String,
    description: 'Key-value pairs for product specs'
  },
  
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  }],
  
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  
  stock: {
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
    lowStockThreshold: {
      type: Number,
      default: 5
    }
  },
  
  tags: [String],
  
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  
  active: {
    type: Boolean,
    default: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Virtual for discount percentage display
productSchema.virtual('discountPercentage').get(function() {
  if (!this.originalPrice) return 0;
  return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
});

// Index for better performance
productSchema.index({ category: 1, price: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ createdAt: -1 });

// Pre-save middleware
productSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  }
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Product', productSchema);
