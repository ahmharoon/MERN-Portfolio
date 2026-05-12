const express = require('express');
const router = express.Router();
const { submitMessage, getMessages } = require('../controllers/messageController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(submitMessage).get(protect, getMessages);

module.exports = router;
