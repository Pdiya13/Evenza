const vendorModel = require('../models/vendor');
const vendor_eventModel = require('../models/vendor_event');

const selectVendorController = async (req, res) => {
  try {
    const availableVendors = await vendorModel.find({});
    return res.status(200).json({
      success: true,
      availableVendors,
    });
  } catch (error) {
    console.error('Error selecting vendors:', error);
    res.status(500).json({
      success: false,
      message: 'Error selecting vendors',
    });
  }
};

const queryController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId,vendorId, budget, eventDate } = req.body;
   
    if (!vendorId || !eventId || !budget || !eventDate) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
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
      message: 'query sent successfully',
      data: newVendorEvent,
    });
  } catch (err) {
    console.error('Error creating vendor query:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating vendor event',
    });
  }
};

module.exports = { selectVendorController, queryController };
