const vendor_eventModel = require("../models/vendor_event");
const vendorModel = require("../models/vendor");
const VendorTask = require("../models/checklist");
const Checklist = require('../models/checklist');

const mongoose = require('mongoose');

const getAcceptedVendorsController = async (req, res) => {
  try {
    const { eventId } = req.query;
    const userId = req.user.id;

    if (!eventId) {
      return res.status(400).json({ status: false, message: "eventId is required" });
    }

    const acceptedVendors = await vendor_eventModel.find({
      eventId,
      userId,
      status: "Accepted",
    }).populate("vendorId", "name category price");

    const result = acceptedVendors.map(item => ({
      _id: item.vendorId._id,
      name: item.vendorId.name,
      category: item.vendorId.category,
      price: item.vendorId.price
    }));

    return res.json({ status: true, vendors: result });
  } catch (err) {
    console.error("Error fetching accepted vendors:", err);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};



const newVendorTask = async (req, res) => {
  const { eventId, vendorId, label } = req.body;
  const userId = req.user.id;

  try {
    console.log("Request Data:", { userId, eventId, vendorId, label });
    const ve = await vendor_eventModel.findOne({ eventId, vendorId, userId, status: "Accepted" });
    if (!ve) {
       console.log("VE not found with params:", { userId, eventId, vendorId });
      return res.status(400).json({ status: false, message: "Vendor not accepted or not linked to user/event" });
    }
    const task = await VendorTask.create({
      eventId,
      vendorId,
      userId,
      label,
    });

    return res.status(201).json({ status: true, task });
  } catch (err) {
    console.error("Error creating vendor task:", err);
    return res.status(500).json({ status: false, error: err.message });
  }
};

const getAllTaskVendorAndEvent = async (req, res) => {
  const { eventId, vendorId } = req.query;
  try {
    const tasks = await VendorTask.find({ eventId, vendorId });
    res.status(200).json({ status: true, tasks });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};


const toggleVendorTaskCompletion = async (req, res) => {
  try {
    const task = await VendorTask.findById(req.params.id);
    if (!task) return res.status(404).json({ status: false, error: 'Task not found' });
    task.checked = !task.checked;
    await task.save();
    res.status(200).json({ status: true, checked: task.checked });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};


const updateVendorTask =  async (req, res) => {
  const { label } = req.body;
  try {
    const task = await VendorTask.findByIdAndUpdate(
      req.params.id,
      { label },
      { new: true }
    );
    res.status(200).json({ status: true, task });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};


const deleteVendorTask = async (req, res) => {
  try {
    await VendorTask.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};


const createPersonalTask = async (req, res) => {
  try {
    const { label } = req.body;
    const userId = req.user._id;

    const newTask = await Checklist.create({
      label,
      userId,
      isPersonal: true,
    });

    res.json({ status: true, task: newTask });
  } catch (err) {
    console.error('Failed to add personal task:', err);
    res.status(500).json({ status: false, message: 'Failed to add task' });
  }
};


const getPersonalTask = async (req, res) => {
  const userId = req.user._id;

  try {
    const tasks = await Checklist.find({ userId, isPersonal: true });
    res.status(200).json({ status: true, tasks });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};



module.exports = {getAcceptedVendorsController ,newVendorTask,
    getAllTaskVendorAndEvent,toggleVendorTaskCompletion,updateVendorTask,
    deleteVendorTask,createPersonalTask,getPersonalTask
};
