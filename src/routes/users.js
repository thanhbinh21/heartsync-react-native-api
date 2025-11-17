const express = require('express');
const User = require('../models/User');
const { getCache, setCache, deleteCache, cacheMiddleware } = require('../utils/cache');

const router = express.Router();

// Get user profile (with caching)
router.get('/me/:userId', async (req, res) => {
  try {
    console.log('📱 Get profile for userId:', req.params.userId);
    
    // Validate ObjectId format
    if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('❌ Invalid userId format');
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    // Check cache first
    const cacheKey = `user:profile:${req.params.userId}`;
    const cachedUser = await getCache(cacheKey);
    
    if (cachedUser) {
      console.log('✅ Cache HIT: User profile');
      return res.json({
        success: true,
        user: cachedUser,
        cached: true
      });
    }

    console.log('❌ Cache MISS: Fetching from database');
    const user = await User.findById(req.params.userId);
    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({
        success: false,
        message: 'User not found. Please login again.'
      });
    }

    const userData = {
      id: user._id,
      username: user.username,
      profile: user.profile,
      preferences: user.preferences,
      subscription: user.subscription,
      verified: user.verified
    };

    // Cache for 5 minutes
    await setCache(cacheKey, userData, 300);

    res.json({
      success: true,
      user: userData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update user profile
router.put('/profile/:userId', async (req, res) => {
  try {
    console.log('📝 Update profile for userId:', req.params.userId);
    console.log('📦 Request body:', JSON.stringify(req.body, null, 2));

    // Validate ObjectId format
    if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('❌ Invalid userId format');
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      console.log('❌ User not found in database');
      console.log('💡 Tip: Frontend might be using old userId. Please login again to get new userId.');
      
      // List available users for debugging
      const allUsers = await User.find({}).select('_id username profile.name');
      console.log('📋 Available users:');
      allUsers.forEach(u => console.log(`   - ${u.username} (${u.profile?.name}): ${u._id}`));
      
      return res.status(404).json({
        success: false,
        message: 'User not found. Please login again to get updated user ID.',
        hint: 'The user ID might be outdated. Try logging in again.'
      });
    }

    // Update profile fields - handle nested objects properly
    if (req.body.profile) {
      Object.keys(req.body.profile).forEach(key => {
        if (req.body.profile[key] !== undefined) {
          if (typeof req.body.profile[key] === 'object' && !Array.isArray(req.body.profile[key]) && req.body.profile[key] !== null) {
            // Merge nested objects like location
            user.profile[key] = { ...user.profile[key], ...req.body.profile[key] };
          } else {
            // Direct assignment for primitives and arrays
            user.profile[key] = req.body.profile[key];
          }
        }
      });
    }

    // Update preferences - handle nested objects properly
    if (req.body.preferences) {
      Object.keys(req.body.preferences).forEach(key => {
        if (req.body.preferences[key] !== undefined) {
          if (typeof req.body.preferences[key] === 'object' && !Array.isArray(req.body.preferences[key]) && req.body.preferences[key] !== null) {
            // Merge nested objects like ageRange
            user.preferences[key] = { ...user.preferences[key], ...req.body.preferences[key] };
          } else {
            user.preferences[key] = req.body.preferences[key];
          }
        }
      });
    }

    await user.save();
    console.log('✅ Profile updated successfully');

    // Clear user cache after update
    const cacheKey = `user:profile:${req.params.userId}`;
    await deleteCache(cacheKey);
    console.log('🗑️ Cache cleared for user:', req.params.userId);

    const userData = {
      id: user._id,
      username: user.username,
      profile: user.profile,
      preferences: user.preferences,
      subscription: user.subscription,
      verified: user.verified
    };

    // Re-cache updated data
    await setCache(cacheKey, userData, 300);

    res.json({
      success: true,
      user: userData
    });
  } catch (error) {
    console.error('❌ Update profile error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get user by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        profile: user.profile,
        subscription: user.subscription,
        verified: user.verified
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;