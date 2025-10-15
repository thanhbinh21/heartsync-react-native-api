const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');

const sampleUsers = [
  {
    username: 'admin',
    password: 'admin',
    profile: {
      name: 'Admin User',
      age: 30,
      photos: ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'],
      aboutMe: 'I am the administrator of HeartSync. Love connecting people and building meaningful relationships.',
      occupation: 'System Administrator',
      gender: 'Male',
      pronouns: 'He/Him/His',
      education: 'Computer Science',
      location: {
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102'
      },
      height: "6'0\"",
      smoking: 'Never',
      drinking: 'Socially',
      pets: 'Dog',
      children: 'Not sure',
      zodiac: 'Leo',
      religion: 'Spiritual',
      interests: ['Technology', 'Hiking', 'Photography', 'Music'],
      languages: ['English', 'Spanish']
    },
    preferences: {
      gender: ['Female', 'Male'],
      ageRange: { min: 25, max: 35 },
      distance: 100,
      languages: ['English']
    },
    subscription: 'premium',
    verified: true
  },
  {
    username: 'ava',
    password: 'password',
    profile: {
      name: 'Ava Jones',
      age: 25,
      photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400'],
      aboutMe: 'It would be wonderful to meet someone who appreciates the arts and enjoys exploring the vibrant culture of the city. I value open-mindedness, good communication, and a shared passion for classical music.',
      occupation: 'Business Analyst at Tech',
      gender: 'Female',
      pronouns: 'She/Her/Hers',
      education: 'University of Nevada',
      location: {
        city: 'Las Vegas',
        state: 'NV',
        zipCode: '89104'
      },
      height: "5'6\"",
      smoking: 'Never',
      drinking: 'Socially',
      pets: 'Dog',
      children: 'Don\'t want',
      zodiac: 'Libra',
      religion: 'Spiritual',
      interests: ['Sci-fi movies', 'Coffee', 'Bowling', 'Cooking', 'Art', 'Music'],
      languages: ['English']
    },
    preferences: {
      gender: ['Male', 'Female'],
      ageRange: { min: 23, max: 35 },
      distance: 30,
      languages: ['English']
    },
    subscription: 'free',
    verified: true
  },
  {
    username: 'joshua',
    password: 'password',
    profile: {
      name: 'Joshua Edwards',
      age: 29,
      photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
      aboutMe: 'Software engineer who loves hiking and outdoor activities. Looking for someone to share adventures with and explore new restaurants.',
      occupation: 'Software Engineer',
      gender: 'Male',
      pronouns: 'He/Him/His',
      education: 'MIT',
      location: {
        city: 'Las Vegas',
        state: 'NV',
        zipCode: '89104'
      },
      height: "6'0\"",
      smoking: 'Never',
      drinking: 'Occasionally',
      pets: 'Cat',
      children: 'Open to having',
      zodiac: 'Capricorn',
      religion: 'Agnostic',
      interests: ['Hiking', 'Technology', 'Cooking', 'Travel', 'Photography'],
      languages: ['English', 'Spanish']
    },
    preferences: {
      gender: ['Female'],
      ageRange: { min: 25, max: 35 },
      distance: 50,
      languages: ['English']
    },
    subscription: 'premium',
    verified: true
  }
];

async function initDatabase() {
  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing users
    await User.deleteMany({});
    console.log('🧹 Cleared existing users');

    // Insert sample users
    // await User.insertMany(sampleUsers);
    // console.log(`✅ Inserted ${sampleUsers.length} sample users`);

    const bcrypt = require('bcryptjs');

    // Hash all passwords before insertMany
    for (let user of sampleUsers) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    }

    await User.insertMany(sampleUsers);
    console.log(`✅ Inserted ${sampleUsers.length} sample users (passwords hashed)`);


    // Verify insertion
    const userCount = await User.countDocuments();
    console.log(`📊 Total users in database: ${userCount}`);

    console.log('\n🎉 Database initialized successfully!');
    console.log('\n📝 Sample login credentials:');
    console.log('   👤 Username: admin');
    console.log('   🔑 Password: admin');
    console.log('\n   👤 Username: ava');
    console.log('   🔑 Password: password');
    console.log('\n   👤 Username: joshua');
    console.log('   🔑 Password: password');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    process.exit(1);
  }
}

initDatabase();