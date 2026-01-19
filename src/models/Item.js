import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide an item name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  category: {
    type: String,
    default: 'General',
  },
  brand: {
    type: String,
    default: '',
  },
  stock: {
    type: Number,
    default: 0,
  },
  features: {
    type: String, // Storing as newline separated string for simplicity based on frontend
    default: '',
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Item || mongoose.model('Item', itemSchema);
