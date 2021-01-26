const express = require('express');

const AdminUserController = require('../controllers/adminUser');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/signup', AdminUserController.adminSignUp);

router.post('/signin', AdminUserController.adminSignIn);

router.put('', checkAuth, AdminUserController.updateAdminUser);

router.delete('', checkAuth, AdminUserController.deleteAdminUser);

module.exports = router;
