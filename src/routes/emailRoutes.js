const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.get('/sync', emailController.syncEmails);
router.get('/', emailController.getEmails);

module.exports = router;
