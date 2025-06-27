const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { selectVendorController, queryVController , queryHandleController, newVendorTask, getAllTaskVendorAndEvent, toggleVendorTaskCompletion, updateVendorTask, deleteVendorTask, getAcceptedVendorsController } = require('../controllers/vendorController');

const router = express.Router();

router.get('/:vendorId/payments', queryVController);
router.post('/payments/:id' , queryHandleController);
// router.post('/payments/:id', queryController);
router.get('/accepted-vendors', isLoggedIn, getAcceptedVendorsController);
router.post('/task', isLoggedIn, newVendorTask);
router.get('/tasks', isLoggedIn, getAllTaskVendorAndEvent);
router.post('/task/:id/toggle', isLoggedIn, toggleVendorTaskCompletion);
router.post('/task/:id/update', isLoggedIn, updateVendorTask);
router.delete('/task/:id', isLoggedIn, deleteVendorTask);


module.exports = router;