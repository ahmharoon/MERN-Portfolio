const mongoose = require('mongoose');

const notificationSettingsSchema = mongoose.Schema(
  {
    emails: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const NotificationSettings = mongoose.model('NotificationSettings', notificationSettingsSchema);

module.exports = NotificationSettings;
