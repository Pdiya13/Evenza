const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const {
  selectVendorController,
  queryController,
  getVendorBudgetsForEvent,
  getUserBudget,
  saveUserBudget,
} = require('../controllers/userController');

const router = express.Router();

router.get('/select-vendor', isLoggedIn, selectVendorController);
router.post('/query-vendor', isLoggedIn, queryController);
router.get('/vendor-budgets', isLoggedIn, getVendorBudgetsForEvent);
router.get('/my-budget', isLoggedIn, getUserBudget);
router.post('/my-budget', isLoggedIn, saveUserBudget);

module.exports = router;
