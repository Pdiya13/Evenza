const express = require('express');

const { selectVendorController, queryVController , queryHandleController, newVendorTask, getAllTaskVendorAndEvent, toggleVendorTaskCompletion, updateVendorTask, deleteVendorTask, getAcceptedVendorsController } = require('../controllers/vendorController');

const router = express.Router();

router.get('/:vendorId/payments', queryVController);
router.post('/payments/:id' , queryHandleController);
// router.post('/payments/:id', queryController);

module.exports = router;