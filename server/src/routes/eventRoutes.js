const {getEventsController , updateEventController , createEventController , fetchChecklistController , addChecklistController , toggleController , deleteChecklistController , updateChecklistController} = require('../controllers/eventController');
const {deleteEventController} = require('../controllers/eventController')
const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/authMiddleware');
router.get('/all-events' ,isLoggedIn ,  getEventsController);
router.post('/all-events/:id' ,isLoggedIn, updateEventController);
router.post('/all-events/delete/:id' ,isLoggedIn, deleteEventController);
router.post('/create' , isLoggedIn  ,  createEventController);
router.get('/checklist' , isLoggedIn , fetchChecklistController);
router.post('/checklist' , isLoggedIn , addChecklistController);
router.post('/checklist/:id/toggle' , isLoggedIn ,toggleController );
router.delete('/checklist/:id' , isLoggedIn , deleteChecklistController);
router.post('/checklist/:id/update' , isLoggedIn , updateChecklistController);
module.exports = router;