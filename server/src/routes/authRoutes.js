const express = require('express');
const { userSignupController , vendorSignupController , vendorLoginController, userLoginController} = require('../controllers/authController');
const router = express.Router();

router.post("/user/login",  userLoginController);
router.post('/vendor/login' , vendorLoginController)
router.post("/user/signup", userSignupController);
router.post("/vendor/signup" , vendorSignupController);

module.exports = router;