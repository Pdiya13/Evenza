const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { selectVendorController, queryController, getVendorItemizedBudgets, getUserBudget, saveUserBudget} = require('../controllers/userController');

const router = express.Router();

router.get('/select-vendor', isLoggedIn, selectVendorController);
router.post('/query-vendor', isLoggedIn, queryController);
router.get("/vendor-itemized-budgets", isLoggedIn, getVendorItemizedBudgets);
router.get('/user/my-budget', isLoggedIn, getUserBudget);
router.post('/user/my-budget', isLoggedIn, saveUserBudget);

module.exports = router;