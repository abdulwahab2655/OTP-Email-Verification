const express = require('express');
const router = express.Router();
const { verifyEmail } = require('../controllers/User');

router.route('/').post(verifyEmail);

module.exports = router;
