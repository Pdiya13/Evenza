const vendor_eventModel = require("../models/vendor_event");

const queryVController = async (req, res) => {
  try {
    const vendorId  = req.params.vendorId;

    if (!vendorId) {
      return res.status(400).json({ message: "vendorId are required" });
    }

    const pendingQueries = await vendor_eventModel.find({
      status: "pending",
      vendorId,
    });
    console.log(pendingQueries)
    res.status(200).json(pendingQueries);
  } catch (error) {
    console.error("Error fetching vendor queries:", error);
    res.status(500).json({ message: "Server error fetching queries" });
  }
};

module.exports = { queryVController };
