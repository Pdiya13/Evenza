const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { selectVendorController, queryVController } = require('../controllers/vendorController');

const router = express.Router();

router.get('/:vendorId/payments', queryVController);
// router.post('/payments/:id', queryController);

module.exports = router;