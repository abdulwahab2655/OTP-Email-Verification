const express = require('express');
const router = express.Router();
const { signUp } = require('../controllers/User');

router.route('/').post(signUp);

module.exports = router;
