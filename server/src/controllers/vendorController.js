const vendorModel = require("../models/vendor");
const vendor_eventModel = require("../models/vendor_event");

const selectVendorController = async (req, res) => {
  try {
    const userId = req.user.id;

    const [availableVendors, vendorQueries] = await Promise.all([
      vendorModel.find({}),
      vendor_eventModel
        .find({ userId })
        .populate("vendorId", "name category price")
        .populate("eventId", "title"),
    ]);

    return res.status(200).json({
      success: true,
      availableVendors,
      vendorQueries,
    });
  } catch (error) {
    console.error("Error fetching vendors or queries:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching vendor data",
    });
  } 
};

const queryController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId, vendorId, budget, eventDate } = req.body;

    if (!vendorId || !eventId || !budget || !eventDate) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newVendorEvent = new vendor_eventModel({
      vendorId,
      eventId,
      userId,
      budget,
      eventDate,
    });
    await newVendorEvent.save();
    return res.status(201).json({
      success: true,
      message: "query sent successfully",
      data: newVendorEvent,
    });
  } catch (err) {
    console.error("Error creating vendor query:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while creating vendor event",
    });
  }
};

module.exports = { selectVendorController, queryController };
