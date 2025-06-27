const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { selectVendorController, queryController } = require('../controllers/userController');

const router = express.Router();

router.get('/select-vendor', isLoggedIn, selectVendorController);
router.post('/query-vendor', isLoggedIn, queryController);

module.exports = router;