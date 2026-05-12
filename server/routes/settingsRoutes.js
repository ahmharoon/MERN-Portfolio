const express = require('express');
const router = express.Router();
const {
  getNotificationSettings,
  updateNotificationSettings,
} = require('../controllers/settingsController');
const { protect } = require('../middlewares/authMiddleware');

router
  .route('/notifications')
  .get(protect, getNotificationSettings)
  .put(protect, updateNotificationSettings);

module.exports = router;
