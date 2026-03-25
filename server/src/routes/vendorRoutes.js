const express = require('express');

const { 
  queryVController,
  queryHandleController,
  getVendorChecklistTasks,
  addVendorPersonalTask,  
  fetchVendorEvents,
  getEventBudget,
  addCostItem,
  getCombinedEventBudget,
  deleteCostItem 
} = require('../controllers/vendorController');

const { isLoggedIn } = require('../middlewares/authMiddleware');

const router = express.Router();

// Payment / Query
router.get('/:vendorId/payments', queryVController);
router.post('/payments/:id', queryHandleController);

// Checklist 

// Get both assigned + personal tasks
router.get('/:eventId/vendor-tasks', isLoggedIn, getVendorChecklistTasks);

// Add vendor personal task
router.post('/:eventId/vendor-personal-task', isLoggedIn, addVendorPersonalTask);

// vendor Events
router.get('/accepted-events', isLoggedIn, fetchVendorEvents);

// Budget
router.get('/getBudget', isLoggedIn, getEventBudget);
router.post('/addCostItem', isLoggedIn, addCostItem);
router.get('/getCombinedBudget', isLoggedIn, getCombinedEventBudget);
router.delete('/deleteCostItem/:eventId/:itemId', isLoggedIn, deleteCostItem);

module.exports = router;