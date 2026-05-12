const NotificationSettings = require('../models/NotificationSettings');

// @desc    Get notification emails
// @route   GET /api/settings/notifications
// @access  Private/Admin
const getNotificationSettings = async (req, res) => {
  try {
    let settings = await NotificationSettings.findOne();
    if (!settings) {
      settings = await NotificationSettings.create({ emails: [] });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update notification emails
// @route   PUT /api/settings/notifications
// @access  Private/Admin
const updateNotificationSettings = async (req, res) => {
  try {
    const { emails } = req.body;
    let settings = await NotificationSettings.findOne();

    if (settings) {
      settings.emails = emails || settings.emails;
      const updatedSettings = await settings.save();
      res.json(updatedSettings);
    } else {
      settings = await NotificationSettings.create({ emails: emails || [] });
      res.status(201).json(settings);
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

module.exports = { getNotificationSettings, updateNotificationSettings };
