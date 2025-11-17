const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const os = require('os');
require('dotenv').config();

const { initRedis, getCacheStats, closeCache } = require('./utils/cache');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Initialize connections
const initializeConnections = async () => {
  await connectDB();
  await initRedis();
};

initializeConnections();

// Function to get local IP address
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (i.e. 127.0.0.1) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

// Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/users', require('./routes/users'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/notifications', require('./routes/notifications'));

// Root API endpoint
app.get('/api', (req, res) => {
  const localIP = getLocalIP();
  const port = process.env.PORT || 5000;
  
  res.json({ 
    message: 'Welcome to HeartSync API 💝',
    version: '1.0.0',
    urls: {
      local: `http://localhost:${port}/api`,
      network: `http://${localIP}:${port}/api`
    },
    endpoints: {
      health: '/api/health',
      test: '/api/test',
      auth: '/api/auth/*',
      users: '/api/users/*',
      matches: '/api/matches/*',
      messages: '/api/messages/*',
      notifications: '/api/notifications/*'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  const cacheStats = getCacheStats();
  res.json({ 
    status: 'OK', 
    message: 'HeartSync API is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    cache: cacheStats
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'HeartSync Backend is working!' });
});

// Error handling
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Listen on all network interfaces

app.listen(PORT, HOST, () => {
  const localIP = getLocalIP();
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`\n📱 API URLs:`);
  console.log(`   Local:   http://localhost:${PORT}/api`);
  console.log(`   Network: http://${localIP}:${PORT}/api`);
  console.log(`\n💡 Use Network URL for mobile device/emulator testing`);
  console.log(`💡 Make sure your phone and computer are on the same WiFi network\n`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await closeCache();
  await mongoose.connection.close();
  process.exit(0);
});