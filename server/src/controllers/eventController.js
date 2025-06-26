const checklistModel = require("../models/checklist");
const eventModel = require("../models/event");
const mongoose = require("mongoose");

const getEventsController = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const userId = user.id;
    console.log(userId);
    const events = await eventModel
      .find({
        userId,
      })
      .sort({ date: 1 });
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

const fetchChecklistController = async (req, res) => {
  console.log("fetchhhh");
  try {
    console.log("fetchhhh");
    const userId = req.user.id;
    const { eventId } = req.query;
    const allchecklist = await checklistModel.find({ userId, eventId });
    res.send({ status: true, checklist: allchecklist });
  } catch (err) {
    console.log(err);
  }
};
const addChecklistController = async (req, res) => {
  try {
    console.log("adddd");
    const { label, eventId } = req.body;
    const userId = req.user.id;
    if (!label || !eventId)
      res.json({
        status: false,
      });
    const newItem = new checklistModel({
      label,
      eventId,
      userId,
      checked: false,
    });

    const savedItem = await newItem.save();

    return res.json({
      status: true,
      checklistItem: savedItem,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Failed to add checklist item",
      error: err.message,
    });
  }
};

const toggleController = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await checklistModel.findById(id);
    console.log(id);
    if (!item)
      return res
        .status(404)
        .json({ status: false, message: "Checklist item not found" });

    item.checked = !item.checked;
    await item.save();

    return res.json({ status: true, checked: item.checked });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: "Failed to toggle item",
      error: err.message,
    });
  }
};
const deleteChecklistController = async (req, res) => {
  try {
    const { id } = req.params;
    await checklistModel.deleteOne({ _id: id });

    return res.status(200).json({
      status: true,
      message: "Checklist item deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting checklist item:", err);
    return res.status(500).json({
      status: false,
      message: "Failed to delete checklist item",
      error: err.message,
    });
  }
};

const updateChecklistController = async (req, res) => {
  try {
    const { id } = req.params;
    const { label } = req.body;

    await checklistModel.updateOne({ _id: id }, { label });

    return res.status(200).json({
      status: true,
      message: "Checklist item updated successfully",
    });
  } catch (err) {
    console.error("Error updating checklist item:", err);
    return res.status(500).json({
      status: false,
      message: "Failed to update checklist item",
      error: err.message,
    });
  }
};

module.exports = {
  getEventsController,
  updateEventController,
  createEventController,
  deleteEventController,
  fetchChecklistController,
  addChecklistController,
  toggleController,
  deleteChecklistController,
  updateChecklistController,
};
