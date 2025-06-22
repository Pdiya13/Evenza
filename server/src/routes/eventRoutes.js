const {getEventsController , updateEventController , createEventController} = require('../controllers/eventController');
const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/authMiddleware');
router.get('/all-events' , getEventsController);
router.post('/all-event/:id' , updateEventController);
router.post('/create' , isLoggedIn  ,  createEventController);
module.exports = router;