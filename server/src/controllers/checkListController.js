const vendor_eventModel = require("../models/vendor_event");
const Checklist = require("../models/checklist");

const mongoose = require("mongoose");

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

const addVendorTask = async (req, res) => {
  const { eventId, vendorId } = req.params;
  const { label } = req.body;
  const userId = req.user.id;
  try {
    const task = await Checklist.create({
      eventId,
      vendorId,
      userId,
      label,
    });
    return res.status(201).json({ status: true, task });
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
};

const fetchVendorTask = async (req, res) => {
  const { eventId, vendorId } = req.params;
  try {
    const vendorTasks = await Checklist.find({ eventId, vendorId });

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

    const { label } = req.body;
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
    const task = await Checklist.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ status: false, error: "Task not found" });
    }
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
    await Checklist.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ status: true, message: "Deleted successfully" });
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
