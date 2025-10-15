const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);