const express = require('express');
const Message = require('../models/Message');
const Match = require('../models/Match');

const router = express.Router();

// Get conversations for a user
router.get('/conversations/:userId', async (req, res) => {
  try {
    const matches = await Match.find({
      users: req.params.userId
    }).populate('users', '-password');

    const conversations = await Promise.all(
      matches.map(async (match) => {
        const messages = await Message.find({ matchId: match._id })
          .sort({ timestamp: -1 })
          .limit(1);

        const otherUser = match.users.find(
          u => u._id.toString() !== req.params.userId
        );

        return {
          matchId: match._id,
          user: {
            id: otherUser._id,
            name: otherUser.profile?.name || otherUser.username,
            photo: otherUser.profile?.photos?.[0] || ''
          },
          lastMessage: messages[0] ? {
            text: messages[0].text,
            timestamp: messages[0].timestamp,
            senderId: messages[0].senderId
          } : null
        };
      })
    );

    res.json({
      success: true,
      conversations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get messages for a match
router.get('/:matchId', async (req, res) => {
  try {
    const messages = await Message.find({
      matchId: req.params.matchId
    }).sort({ timestamp: 1 });

    res.json({
      success: true,
      messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Send a message
router.post('/send', async (req, res) => {
  try {
    const { matchId, senderId, text } = req.body;

    if (!matchId || !senderId || !text) {
      return res.status(400).json({
        success: false,
        message: 'matchId, senderId and text required'
      });
    }

    const message = new Message({
      matchId,
      senderId,
      text
    });

    await message.save();

    res.json({
      success: true,
      message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
