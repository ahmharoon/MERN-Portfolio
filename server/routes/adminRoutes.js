const express = require('express');
const router = express.Router();
const { authAdmin, setupAdmin } = require('../controllers/adminController');

router.post('/login', authAdmin);
// Note: Remove or secure /setup in production!
router.post('/setup', setupAdmin);

module.exports = router;
