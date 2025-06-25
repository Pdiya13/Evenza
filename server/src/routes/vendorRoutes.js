const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { selectVendorController } = require('../controllers/vendorController');

const router = express.Router();

router.get('/select-vendor', isLoggedIn, selectVendorController);

module.exports = router;