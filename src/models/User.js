const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    name: String,
    age: Number,
    photos: [String],
    aboutMe: String,
    occupation: String,
    gender: String,
    pronouns: String,
    education: String,
    location: {
      city: String,
      state: String,
      zipCode: String
    },
    height: String,
    smoking: String,
    drinking: String,
    pets: String,
    children: String,
    zodiac: String,
    religion: String,
    interests: [String],
    languages: [String]
  },
  preferences: {
    gender: [String],
    ageRange: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 80 }
    },
    distance: { type: Number, default: 50 },
    languages: [String]
  },
  subscription: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  verified: {
    type: Boolean,
    default: false
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);