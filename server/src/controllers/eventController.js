const mongoose = require("mongoose");
const twilio = require("twilio");
const checklistModel = require("../models/checklist");
const eventModel = require("../models/event");


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);


const invitedSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  message: { type: String, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "pending" },
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invited", invitedSchema);


const sendWhatsAppController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { contacts, message, eventId } = req.body;

    if (!contacts || !contacts.length || !message || !eventId) {
      return res.status(400).json({ status: false, message: "Missing contacts, message, or eventId" });
    }

    const results = [];

    for (const phone of contacts) {
      try {    
        const invited = new Invited({
          phone,
          message,
          eventId,
          userId,
          sentAt: new Date(),
          status: "pending", 
        });
        await invited.save();

        const waLink = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

        results.push({ phone, status: "pending", waLink });
      } catch (err) {
        console.error(`Failed to save ${phone}:`, err.message);
        results.push({ phone, status: "failed", error: err.message });
      }
    }

    res.json({ status: true, message: "Contacts saved", results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};


const getEventsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await eventModel.find({ userId }).sort({ date: 1 });
    if (!events.length) return res.json({ status: false, message: "You have No Events" });
    return res.json({ status: true, events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

const updateEventController = async (req, res) => {
  try {
    const { ename, location, date, type } = req.body;
    const eventId = req.params.id;

    const event = await eventModel.findById(new mongoose.Types.ObjectId(eventId));
    if (!event) return res.status(404).json({ status: false, message: "Event not found" });

    event.ename = ename || event.ename;
    event.location = location || event.location;
    event.date = date || event.date;
    event.type = type || event.type;

    await event.save();
    res.status(200).json({ status: true, message: "Event updated successfully", event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

const createEventController = async (req, res) => {
  try {
    const { ename, location, description, date, type } = req.body;
    const userId = req.user.id;

    const event = new eventModel({ ename, location, description, date, type, userId });
    const savedEvent = await event.save();

    res.json({ status: true, message: "Event created successfully", event: savedEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Failed to create event", error: err.message });
  }
};

const deleteEventController = async (req, res) => {
  try {
    const eventId = req.params.id;
    await eventModel.deleteOne({ _id: new mongoose.Types.ObjectId(eventId) });
    res.json({ status: true, message: "Event deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Failed to delete event", error: err.message });
  }
};

// ------------------- Checklist Controllers -------------------
const fetchChecklistController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.query;
    const checklist = await checklistModel.find({ userId, eventId });
    res.json({ status: true, checklist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Failed to fetch checklist", error: err.message });
  }
};

const addChecklistController = async (req, res) => {
  try {
    const { label, eventId } = req.body;
    const userId = req.user.id;
    if (!label || !eventId) return res.json({ status: false });

    const newItem = new checklistModel({ label, eventId, userId, checked: false });
    const savedItem = await newItem.save();
    res.json({ status: true, checklistItem: savedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Failed to add checklist item", error: err.message });
  }
};

const toggleController = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await checklistModel.findById(id);
    if (!item) return res.status(404).json({ status: false, message: "Checklist item not found" });

    item.checked = !item.checked;
    await item.save();
    res.json({ status: true, checked: item.checked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Failed to toggle item", error: err.message });
  }
};

const deleteChecklistController = async (req, res) => {
  try {
    const { id } = req.params;
    await checklistModel.deleteOne({ _id: id });
    res.json({ status: true, message: "Checklist item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Failed to delete checklist item", error: err.message });
  }
};

const updateChecklistController = async (req, res) => {
  try {
    const { id } = req.params;
    const { label } = req.body;
    await checklistModel.updateOne({ _id: id }, { label });
    res.json({ status: true, message: "Checklist item updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Failed to update checklist item", error: err.message });
  }
};

module.exports = {
  sendWhatsAppController,
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
