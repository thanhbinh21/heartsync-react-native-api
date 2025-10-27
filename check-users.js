const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./src/models/User');

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const users = await User.find({}).select('_id username profile.name');
    
    console.log('📋 Available users in database:\n');
    users.forEach(user => {
      console.log(`👤 Username: ${user.username}`);
      console.log(`   Name: ${user.profile?.name || 'N/A'}`);
      console.log(`   ID: ${user._id}`);
      console.log('');
    });
    
    console.log(`Total: ${users.length} users`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkUsers();
