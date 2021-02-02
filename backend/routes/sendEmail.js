const express = require('express');

const sendEmailController = require('../controllers/sendEmail');

const router = express.Router();

router.post('', sendEmailController.sendEmail);

router.post('/no-reply', sendEmailController.sendEmailFromFakeAddress);

module.exports = router;
