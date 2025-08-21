const {getEventsController , updateEventController , createEventController , fetchChecklistController , addChecklistController , toggleController , deleteChecklistController , updateChecklistController , sendMessageController} = require('../controllers/eventController');
const {deleteEventController} = require('../controllers/eventController')
const {fetchPersonalTask , toggleTask  , addPersonalTask , fetchAcceptedVendors , deleteTask , fetchVendorTask , addVendorTask, updateTask} = require('../controllers/checkListController')
const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/authMiddleware');
router.get('/all-events' ,isLoggedIn ,  getEventsController);
router.post('/all-events/:id' ,isLoggedIn, updateEventController);
router.post('/all-events/delete/:id' ,isLoggedIn, deleteEventController);
router.post('/create' , isLoggedIn  ,  createEventController);

router.post('/send-message', isLoggedIn, sendMessageController);

router.get('/acceptedvendors/:eventId', isLoggedIn, (req, res, next) => {
  console.log('Request reached backend route', req.params.eventId);
  next();
} , fetchAcceptedVendors);

router.post('/checklist/task/toggle/:taskId' , isLoggedIn , toggleTask);
router.post('/checklist/task/delete/:taskId' , isLoggedIn , deleteTask);
router.post('/checklist/task/update/:taskId', isLoggedIn, updateTask);

router.get('/checklist/task/personal/:eventId' , isLoggedIn , fetchPersonalTask);
router.post('/checklist/task/personal/:eventId' , isLoggedIn , addPersonalTask);

router.get('/checklist/task/vendor/:eventId/:vendorId' , isLoggedIn ,fetchVendorTask);
router.post('/checklist/task/vendor/:eventId/:vendorId' , isLoggedIn ,addVendorTask);

module.exports = router;