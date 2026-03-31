const vendor_eventModel = require("../models/vendor_event");
const Checklist = require("../models/checklist");
const eventModel = require("../models/event");

const mongoose = require("mongoose");

const checkEventExpired = async (eventId) => {
  const event = await eventModel.findById(eventId);

  if (!event) return { error: "Event not found" };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(event.date);
  eventDate.setHours(0, 0, 0, 0);

  const isExpired = eventDate < today;

  return { isExpired, event };
};

const fetchAcceptedVendors = async (req, res) => {
  try {
   
    const { eventId } = req.params;
    const userId = req.user.id;

    if (!eventId) {
      return res
        .status(400)
        .json({ status: false, message: "eventId is required" });
    }

    const acceptedVendors = await vendor_eventModel
      .find({
        eventId,
        userId,
        status: "Accepted",
      })
      .populate("vendorId", "name category price");

    const result = acceptedVendors.map((item) => ({
      _id: item.vendorId._id,
      name: item.vendorId.name,
      category: item.vendorId.category,
      price: item.vendorId.price,
    }));

    return res.json({ status: true, acceptedVendors: result });
  } catch (err) {
    console.error("Error fetching accepted vendors:", err);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

//user assign task to vendor  
const addVendorTask = async (req, res) => {
  const { eventId, vendorId } = req.params;
  const { label } = req.body;
  const userId = req.user.id;
  try {

   const { isExpired, error } = await checkEventExpired(eventId);

  if (error) {
    return res.status(404).json({ status: false, error });
  }

    if (isExpired) {
      return res.status(400).json({
        status: false,
        message: "Event expired. Cannot assign task.",
      });
    }
    const task = await Checklist.create({
      eventId,
      vendorId,
      userId,
      label,
      isPersonal: false,
    });
    return res.status(201).json({ status: true, task });
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
};

const fetchVendorTask = async (req, res) => {
  const { eventId, vendorId } = req.params;
  try {
    const vendorTasks = await Checklist.find({
      eventId,
      vendorId,
      isPersonal: false,   
    });

    res.status(200).json({ status: true, vendorTasks });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Checklist.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ status: false, error: "Task not found" });
    }

    //CHECK EVENT EXPIRY
    const { isExpired, error } = await checkEventExpired(task.eventId);

    if (error) {
      return res.status(404).json({ status: false, error });
    }

    if (isExpired) {
      return res.status(400).json({
        status: false,
        message: "Event expired. Cannot update task.",
      });
    }

    const { label } = req.body;

    if (!label || !label.trim()) {
      return res.status(400).json({
        status: false,
        message: "Label cannot be empty",
      });
    }
    task.label = label;
    await task.save();

    res.status(200).json({
      status: true,
      newUpdatedTask: task,
      personal: task.isPersonal,
      vendorId: task.vendorId || null,
    });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};

const toggleTask = async (req, res) => {
  try {
    // FIRST fetch task
    const task = await Checklist.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        status: false,
        error: "Task not found",
      });
    }

    // THEN check event expiry
    const { isExpired, error } = await checkEventExpired(task.eventId);

    if (error) {
      return res.status(404).json({ status: false, error });
    }

    if (isExpired) {
      return res.status(400).json({
        status: false,
        message: "Event expired. Cannot modify task.",
      });
    }

    const userId = req.user.id;

    // Personal task (user or vendor)
    if (task.isPersonal) {
      if (
        task.userId &&
        task.userId.toString() !== userId &&
        task.vendorId &&
        task.vendorId.toString() !== userId
      ) {
        return res.status(403).json({ message: "Not allowed" });
      }
    }

    // Vendor assigned task → ONLY vendor can toggle
    if (!task.isPersonal && task.vendorId) {
      if (task.vendorId.toString() !== userId) {
        return res.status(403).json({
          message: "Only vendor can update this task",
        });
      }
    }

    // toggle
    task.checked = !task.checked;
    await task.save();

    res.status(200).json({
      status: true,
      checked: task.checked,
      isPersonal: task.isPersonal,
      vendorId: task.vendorId || null,
      taskId: task._id,
    });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};

const fetchPersonalTask = async (req, res) => {
  const userId = req.user.id;
  const { eventId } = req.params;
  try {
    const personalTask = await Checklist.find({
      eventId,
      userId,
      isPersonal: true,
    });
    res.status(200).json({ status: true, personalTask });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};

const addPersonalTask = async (req, res) => {
  try {
    const { label } = req.body;
    const { eventId } = req.params;
    const userId = req.user.id;

    const { isExpired, error } = await checkEventExpired(eventId);

    if (error) {
      return res.status(404).json({ status: false, error });
    }

    if (isExpired) {
      return res.status(400).json({
        status: false,
        message: "Event expired. Cannot add task.",
      });
    }

    const newTask = await Checklist.create({
      label,
      eventId,
      userId,
      isPersonal: true,
    });

    res.json({ status: true, newTask });
  } catch (err) {
    res.status(500).json({ status: false, message: "Failed to add task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Checklist.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    const { isExpired, error } = await checkEventExpired(task.eventId);

    if (error) {
      return res.status(404).json({ status: false, error });
    }

    if (isExpired) {
      return res.status(400).json({
        status: false,
        message: "Event expired. Cannot delete task.",
      });
    }

    await Checklist.findByIdAndDelete(req.params.taskId);

    res.status(200).json({
      status: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};

module.exports = {
  fetchAcceptedVendors,
  addVendorTask,
  fetchVendorTask,
  toggleTask,
  updateTask,
  deleteTask,
  addPersonalTask,
  fetchPersonalTask,
};
