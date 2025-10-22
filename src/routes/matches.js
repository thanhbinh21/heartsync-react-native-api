const express = require('express');
const User = require('../models/User');
const Like = require('../models/Like');
const Match = require('../models/Match');

const router = express.Router();

// Get potential matches (users to swipe)
router.get('/discover/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const existingLikes = await Like.find({ userId: currentUser._id });
    const likedUserIds = existingLikes.map(like => like.likedUserId.toString());

    const query = {
      _id: { 
        $ne: currentUser._id,
        $nin: likedUserIds
      }
    };

    if (currentUser.preferences?.ageRange) {
      query['profile.age'] = {
        $gte: currentUser.preferences.ageRange.min,
        $lte: currentUser.preferences.ageRange.max
      };
    }

    if (currentUser.preferences?.gender && currentUser.preferences.gender.length > 0) {
      query['profile.gender'] = { $in: currentUser.preferences.gender };
    }

    const users = await User.find(query).select('-password').limit(50);

    const transformedUsers = users.map(user => ({
      id: user._id.toString(),
      name: user.profile?.name || user.username,
      age: user.profile?.age || 0,
      photos: user.profile?.photos || [],
      bio: user.profile?.aboutMe || '',
      location: user.profile?.location?.city || '',
      job: user.profile?.occupation || '',
      education: user.profile?.education || '',
      interests: user.profile?.interests || [],
      verified: user.verified
    }));

    res.json({
      success: true,
      users: transformedUsers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Swipe action (like or pass)
router.post('/swipe', async (req, res) => {
  try {
    const { userId, targetUserId, action } = req.body;

    if (!userId || !targetUserId || !action) {
      return res.status(400).json({
        success: false,
        message: 'userId, targetUserId and action required'
      });
    }

    const existingLike = await Like.findOne({
      userId,
      likedUserId: targetUserId
    });

    if (existingLike) {
      return res.status(400).json({
        success: false,
        message: 'Already swiped on this user'
      });
    }

    const like = new Like({
      userId,
      likedUserId: targetUserId,
      likeType: action
    });

    await like.save();

    let isMatch = false;
    let matchId = null;

    if (action === 'like') {
      const reciprocalLike = await Like.findOne({
        userId: targetUserId,
        likedUserId: userId,
        likeType: 'like'
      });

      if (reciprocalLike) {
        const match = new Match({
          users: [userId, targetUserId]
        });
        await match.save();
        isMatch = true;
        matchId = match._id;
      }
    }

    res.json({
      success: true,
      isMatch,
      matchId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get user matches
router.get('/:userId', async (req, res) => {
  try {
    const matches = await Match.find({
      users: req.params.userId
    }).populate('users', '-password');

    const transformedMatches = matches.map(match => {
      const otherUser = match.users.find(u => u._id.toString() !== req.params.userId);
      return {
        id: match._id,
        matchedAt: match.matchedAt,
        user: {
          id: otherUser._id,
          name: otherUser.profile?.name || otherUser.username,
          age: otherUser.profile?.age,
          photos: otherUser.profile?.photos || [],
          bio: otherUser.profile?.aboutMe
        }
      };
    });

    res.json({
      success: true,
      matches: transformedMatches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
