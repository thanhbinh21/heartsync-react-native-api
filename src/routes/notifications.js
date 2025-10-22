const express = require('express');
const Notification = require('../models/Notification');

const router = express.Router();

// Get user notifications
router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Mark notification as read
router.put('/:notificationId/read', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    notification.isRead = true;
    await notification.save();

    res.json({
      success: true,
      notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create notification
router.post('/create', async (req, res) => {
  try {
    const { userId, type, title, message, data } = req.body;

    if (!userId || !type) {
      return res.status(400).json({
        success: false,
        message: 'userId and type required'
      });
    }

    const notification = new Notification({
      userId,
      type,
      title,
      message,
      data
    });

    await notification.save();

    res.json({
      success: true,
      notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
