const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/outlook', authController.outlookAuth);
router.get('/outlook/callback', authController.outlookCallback, authController.redirectAfterLogin);

module.exports = router;
