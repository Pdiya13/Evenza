const express = require('express');
const { signupController , loginController } = require('../controllers/authController');

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);

module.exports = router;