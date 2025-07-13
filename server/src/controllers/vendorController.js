const vendor_eventModel = require("../models/vendor_event");
const vendorModel = require("../models/vendor");
const VendorTask = require("../models/checklist");
const Checklist = require('../models/checklist');
const mongoose = require('mongoose');
const vendor_budgetModel = require('../models/vendor_budget');

const queryVController = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    console.log(vendorId);

    if (!vendorId) {
      return res.status(400).json({ message: "vendorId is required" });
    }

    const vendorObjectId = new mongoose.Types.ObjectId(vendorId);

    const pendingQueries = await vendor_eventModel.find({
      status: "Pending",
      vendorId: vendorObjectId,
    }).populate('userId', 'name') 
      .populate('eventId', "ename date")
      .populate('vendorId', 'name');

    console.log(pendingQueries);
    res.status(200).json(pendingQueries);
  } catch (error) {
    console.error("Error fetching vendor queries:", error);
    res.status(500).json({ message: "Server error fetching queries" });
  }
};

const queryHandleController = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; 
  if (!id || !status) {
    return res.status(400).json({ message: "Query ID and status are required" });
  }

  try {
    const query = await vendor_eventModel.findById(id);
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }
    query.status = status;
    await query.save(); 
    return res.status(200).json({
      status: true,
      message: "Updated",
      updatedQuery: query,
    });
  } catch (error) {
    console.error("Error updating query status:", error);
    res.status(500).json({ message: "Error updating query status" });
  }
};
async function getVendorChecklistTasks(req, res) {
  try {
    console.log("VENDOR")
    const { eventId } = req.params;
    const vendorId = req.user.id;

    if (!eventId || !vendorId) {
      return res.status(400).json({ status: false, message: "eventId and vendorId required" });
    }

    const tasks = await Checklist.find({ eventId, vendorId });
    return res.json({ status: true, tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Server error' });
  }
}

const fetchVendorEvents = async (req, res) => {
  try {
    const vendorId = req.user.id;

    if (!vendorId) {
      return res.status(400).json({ status: false, message: "Vendor ID missing" });
    }

    const acceptedEvents = await vendor_eventModel.find({
      vendorId,
      status: "Accepted"
    })
      .populate('eventId', 'ename date location type')  
      .populate('userId', 'name phone')            
      .select('eventId userId');               

    console.log(acceptedEvents);

    const events = acceptedEvents.map(item => {
      if (!item.eventId || !item.userId) return null;

      return {
        _id: item.eventId._id,
        title: item.eventId.ename || "Untitled Event",
        date: item.eventId.date,
        type:item.eventId.type,
        location: item.eventId.location || '',
        userName: item.userId.name || 'Unknown',
        userPhone: item.userId.phone || 'N/A',
      };
    }).filter(Boolean);

    console.log(events);

    return res.status(200).json({ status: true, events });

  } catch (err) {
    console.error("Error fetching vendor accepted events:", err);
    return res.status(500).json({ status: false, message: "Server error fetching events" });
  }
};


const getEventBudget = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const { eventId } = req.query;

    if (!eventId) {
      return res.status(400).json({ status: false, message: "EventId is required" });
    }

    const budgetDoc = await vendor_budgetModel.findOne({ vendorId, eventId });

    if (!budgetDoc) {
      return res.status(404).json({ status: false, message: "Budget not found" });
    }

    return res.status(200).json({
      status: true,
      budget: budgetDoc.budget,
      items: budgetDoc.items || [], // ✅ send items array
    });
  } catch (err) {
    console.error("Error fetching budget:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};


const getCombinedEventBudget = async (req, res) => {
  try {
    const vendorId = req.user.id;   
    const { eventId } = req.query;

    if (!eventId) {
      return res.status(400).json({ status: false, message: "EventId is required" });
    }

    console.log("get combined budeget");
    const vendorEvent = await vendor_eventModel.findOne({ vendorId, eventId });

    if (!vendorEvent) {
      return res.status(404).json({ status: false, message: "Vendor event not found" });
    }
    const initialBudget = vendorEvent.budget;
    console.log(vendorEvent);

    const vendorBudget = await vendor_budgetModel.findOne({ vendorId, eventId });
    const totalSpent = vendorBudget ? vendorBudget.budget : 0;   
    const items = vendorBudget ? vendorBudget.items : [];

    return res.status(200).json({
      status: true,
      totalBudget: initialBudget,
      totalSpent,
      items,
    });
  } catch (err) {
    console.error("Error fetching combined budget:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

const addCostItem = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const { eventId, category, cost } = req.body;

    if (!eventId || !category || cost == null) {
      return res.status(400).json({ status: false, message: "Missing required fields" });
    }

    let budgetDoc = await vendor_budgetModel.findOne({ vendorId, eventId });

    if (!budgetDoc) {
      budgetDoc = new vendor_budgetModel({
        vendorId,
        eventId,
        budget: cost,  
        isVendor: true,
        items: [{ category, cost }],
      });
    } else {
      budgetDoc.items.push({ category, cost });
      budgetDoc.budget += cost;  
    }

    await budgetDoc.save();

    return res.status(200).json({ status: true, items: budgetDoc.items });
  } catch (err) {
    console.error("Error adding cost item:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

const deleteCostItem = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const { eventId, itemId } = req.params;

    if (!eventId || !itemId) {
      return res.status(400).json({ status: false, message: "EventId and ItemId are required" });
    }

    const budgetDoc = await vendor_budgetModel.findOne({ vendorId, eventId });
    if (!budgetDoc) {
      return res.status(404).json({ status: false, message: "Budget document not found" });
    }

    const itemIndex = budgetDoc.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ status: false, message: "Cost item not found" });
    }

    const itemCost = budgetDoc.items[itemIndex].cost;
    budgetDoc.budget -= itemCost;

    budgetDoc.items.splice(itemIndex, 1);

    await budgetDoc.save();

    return res.status(200).json({ status: true, items: budgetDoc.items });
  } catch (err) {
    console.error("Error deleting cost item:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};



module.exports = { queryVController, queryHandleController,getVendorChecklistTasks , fetchVendorEvents,getEventBudget,addCostItem,getCombinedEventBudget,deleteCostItem};
