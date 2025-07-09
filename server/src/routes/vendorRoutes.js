const express = require('express');

const {queryVController , queryHandleController, getVendorChecklistTasks , fetchVendorEvents, getEventBudget, addCostItem } = require('../controllers/vendorController');
const { isLoggedIn } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:vendorId/payments', queryVController);
router.post('/payments/:id' , queryHandleController);
router.get('/:eventId/vendor-tasks', isLoggedIn, getVendorChecklistTasks);
router.get('/accepted-events', isLoggedIn, fetchVendorEvents);
router.get('/getBudget', isLoggedIn, getEventBudget);
router.post('/addCostItem', isLoggedIn, addCostItem);


module.exports = router;