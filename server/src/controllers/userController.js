const vendorModel = require("../models/vendor");
const { vendor_budgetModel } = require("../models/vendor_budget");
const vendor_eventModel = require("../models/vendor_event");

const selectVendorController = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.query.eventId;

    const [availableVendors, vendorQueries] = await Promise.all([
      vendorModel.find({}),
      vendor_eventModel
        .find({ userId,eventId })
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

const getVendorItemizedBudgets = async (req, res) => {
  try {
    const { eventId } = req.query;
    console.log("event id ", eventId);

    const data = await vendor_budgetModel.find({ eventId })
      .populate("vendorId", "name category");

    const response = data.map(doc => ({
      vendorId: doc.vendorId._id,
      name: doc.vendorId.name,
      category: doc.vendorId.category,
      items: doc.items,
      totalBudget: doc.budget,
    }));
    res.status(200).json({ success: true, data: response });

  } catch (error) {
    console.error("Error fetching vendor itemized budgets:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const getUserBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.query;

    if (!eventId) {
      return res.status(400).json({ success: false, message: "Event ID required" });
    }

    const userBudgetDoc = await vendor_budgetModel.findOne({
      eventId,
      userId,
      isVendor: false,
    });

    if (!userBudgetDoc) {
      return res.status(200).json({ success: true, data: { budget: 0, items: [] } });
    }

    res.status(200).json({
      success: true,
      data: {
        budget: userBudgetDoc.budget,
        items: userBudgetDoc.items,
      },
    });
  } catch (error) {
    console.error("Error fetching user budget:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const saveUserBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId, budget, items } = req.body;

    if (!eventId || budget === undefined || !Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    let userBudgetDoc = await vendor_budgetModel.findOne({
      eventId,
      userId,
      isVendor: false,
    });

    if (userBudgetDoc) {
      userBudgetDoc.budget = budget;
      userBudgetDoc.items = items;
      await userBudgetDoc.save();
    } else {
      userBudgetDoc = new vendor_budgetModel({
        eventId,
        userId,
        isVendor: false,
        budget,
        items,
      });
      await userBudgetDoc.save();
    }

    res.status(200).json({ success: true, message: "Budget saved", data: userBudgetDoc });
  } catch (error) {
    console.error("Error saving user budget:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = { selectVendorController, queryController,getVendorItemizedBudgets, getUserBudget,saveUserBudget,};
