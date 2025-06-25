const vendorModel = require('../models/vendor');
const vendor_eventModel = require('../models/vendor_event');

const selectVendorController = async (req,res) => {
    try{
        const availableVendors = await vendorModel.find({
        status: 'available',
        });
        return res.status(200).json({
        success: true,
        availableVendors,
        });
    }
    catch (error) {
        console.error('Error selecting vendors:', error);
        res.status(500).json({
        success: false,
        message: 'Error selecting vendors',
        });
    }
}

module.exports = {selectVendorController};