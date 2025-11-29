const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/admin_auth';

console.log('🔌 Attempting MongoDB connection...');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 3000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.warn('⚠️ MongoDB connection failed (running in demo mode):', err.message);
    // Allow server to run without database connection
  }
};

connectDB();

const db = mongoose.connection;

db.on('error', (err) => {
  console.warn('⚠️ MongoDB connection error:', err.message);
});

db.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});

module.exports = mongoose;