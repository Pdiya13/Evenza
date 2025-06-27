const express = require('express');

const { selectVendorController, queryVController , queryHandleController, newVendorTask, getAllTaskVendorAndEvent, toggleVendorTaskCompletion, updateVendorTask, deleteVendorTask, getAcceptedVendorsController, getVendorChecklistTasks } = require('../controllers/vendorController');
const { isLoggedIn } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:vendorId/payments', queryVController);
router.post('/payments/:id' , queryHandleController);
router.get('/vendor-tasks', isLoggedIn, getVendorChecklistTasks);
// router.post('/payments/:id', queryController);

module.exports = router;