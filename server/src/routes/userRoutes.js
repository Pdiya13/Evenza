const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { selectVendorController, queryController, getVendorItemizedBudgets} = require('../controllers/userController');

const router = express.Router();

router.get('/select-vendor', isLoggedIn, selectVendorController);
router.post('/query-vendor', isLoggedIn, queryController);
router.get("/vendor-itemized-budgets", isLoggedIn, getVendorItemizedBudgets);

module.exports = router;