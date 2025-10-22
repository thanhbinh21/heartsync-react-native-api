const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  matchedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastMessageAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Ensure users array has exactly 2 users
matchSchema.pre('save', function(next) {
  if (this.users.length !== 2) {
    next(new Error('A match must have exactly 2 users'));
  }
  next();
});

// Create compound index to prevent duplicate matches
matchSchema.index({ users: 1 }, { unique: true });

module.exports = mongoose.model('Match', matchSchema);
