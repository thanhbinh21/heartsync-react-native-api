const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likeType: {
    type: String,
    enum: ['like', 'super_like', 'pass'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create compound index to prevent duplicate likes
likeSchema.index({ userId: 1, likedUserId: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);
