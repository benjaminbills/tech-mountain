const express = require('express');
const authController = require('./../controllers/authController')


const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// ALL ROUTES AFTER THIS ARE PROTECTED



module.exports = router;
