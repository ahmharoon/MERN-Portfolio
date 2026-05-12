const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect } = require('../middlewares/authMiddleware');

// @desc    Upload an image to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({
    message: 'Image Uploaded Successfully',
    imageUrl: req.file.path,
  });
});

module.exports = router;
