const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { selectVendorController } = require('../controllers/vendorController');

const router = express.Router();

router.post('/select-vendor',isLoggedIn,selectVendorController);

module.exports = router;