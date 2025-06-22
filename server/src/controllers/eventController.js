const eventModel = require('../models/event');

const getEventsController = (req ,res)=>{

}
const updateEventController = (req , res)=>{

}
const createEventController = async (req , res)=>{
     const { ename, location, description, date, type } = req.body;
    try {
        const event = new eventModel({
            ename,
            location,
            description,
            date,
            type
        });

        const savedEvent = await event.save();
        return res.json({ status:true , message: 'Event created successfully', event: savedEvent });
    } catch (error) {
        console.error(error);
        return res.status(500).json({status:false ,  message: 'Failed to create event', error: error.message });
    }
}
module.exports = {getEventsController , updateEventController , createEventController};