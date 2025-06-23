const eventModel = require("../models/event");
const mongoose = require("mongoose");

const getEventsController = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const userId = user.id;
    console.log(userId);
    const events = await eventModel.find({
      userId,
    }).sort({date:1});
    console.log(events);
    if (events.length == 0) {
      return res.json({
        status: false,
        message: "You have No Events",
      });
    }
    return res.json({ status: true, events: events });
  } catch (err) {
    console.log(err);
  }
};
const updateEventController = async (req, res) => {
  try {
    console.log(req.user);
    const { ename, location, date, type } = req.body;
    const userId = req.user.id;
    const eventId = req.params.id;

    const event = await eventModel.findById(
      new mongoose.Types.ObjectId(eventId)
    );
    event.ename = ename || event.ename;
    event.location = location || event.location;
    event.date = date || event.date;
    event.type = type || event.type;

    await event.save();
    return res
      .status(200)
      .json({ status: "true", message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error updating event:", error);
    return res.json({ status: "false", message: "Server error" });
  }
};
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
      userId,
    });
    const savedEvent = await event.save();
    return res.json({
      status: true,
      message: "Event created successfully",
      event: savedEvent,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
};

const deleteEventController = async (req, res) => {
  try {
    console.log("delte");
    console.log(req.params.id);
    const eventId = req.params.id;
    console.log(eventId);
    const event = await eventModel.deleteOne({
      _id: new mongoose.Types.ObjectId(eventId),
    });

    return res.json({ status: true, message: "event deleted" });
  } catch (err) {
    return res.json({
      status: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
};
module.exports = {
  getEventsController,
  updateEventController,
  createEventController,
  deleteEventController,
};
