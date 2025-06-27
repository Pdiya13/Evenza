const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { getAcceptedVendorsController, newVendorTask, getAllTaskVendorAndEvent, toggleVendorTaskCompletion, updateVendorTask, deleteVendorTask, createPersonalTask, getPersonalTask } = require('../controllers/checkListController');


const router = express.Router();

router.get('/accepted-vendors', isLoggedIn, getAcceptedVendorsController);
router.post('/task', isLoggedIn, newVendorTask);
router.get('/tasks', isLoggedIn, getAllTaskVendorAndEvent);
router.post('/task/:id/toggle', isLoggedIn, toggleVendorTaskCompletion);
router.post('/task/:id/update', isLoggedIn, updateVendorTask);
router.delete('/task/:id', isLoggedIn, deleteVendorTask);
router.post('/personal/task', isLoggedIn,createPersonalTask);
router.get('/personal/tasks', isLoggedIn,getPersonalTask);

module.exports = router;