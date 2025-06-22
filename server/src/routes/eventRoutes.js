const {getEventsController , updateEventController , createEventController} = require('../controllers/eventController');
const {deleteEventController} = require('../controllers/eventController')
const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/authMiddleware');
router.get('/all-events' ,isLoggedIn ,  getEventsController);
router.post('/all-events/:id' ,isLoggedIn, updateEventController);
router.post('/all-events/delete/:id' ,isLoggedIn, deleteEventController);
router.post('/create' , isLoggedIn  ,  createEventController);
module.exports = router;