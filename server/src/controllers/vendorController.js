const vendor_eventModel = require("../models/vendor_event");
const mongoose = require('mongoose');

// Fetch pending queries for a vendor
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

// Handle Accept/Reject actions for a query
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

module.exports = { queryVController, queryHandleController };
