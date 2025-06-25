const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { createEventController } = require('../controllers/eventController');

const router = express.Router();

router.post('/select-vendor',isLoggedIn,selectVendorController);

module.exports = router;