const eventModel = require("../models/event");

const getEventsController = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const userId = user.id;
    console.log(userId);
    const events = await eventModel.find({
      userId,
    });
    console.log(events);
    // console.log(events.length);
    if(events.length == 0)
    {
        return res.json({
            status:false , message:"You have No Events"
        })
    }
    return res.json({status : true , events:events});
  } catch (err) {
    console.log(err);
  }
};
const updateEventController = (req, res) => {};
const createEventController = async (req, res) => {
  const { ename, location, description, date, type } = req.body;
  try {
    const userId = req.user.id;
    console.log(userId.type);
    const event = new eventModel({
      ename,
      location,
      description,
      date,
      type,
      userId
    });
    const savedEvent = await event.save();
    return res.json({
      status: true,
      message: "Event created successfully",
      event: savedEvent,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        status: false,
        message: "Failed to create event",
        error: error.message,
      });
  }
};
module.exports = {
  getEventsController,
  updateEventController,
  createEventController,
};
