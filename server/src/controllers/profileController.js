const { userModel } = require("../models/user");
const vendorModel = require("../models/vendor");

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let user;

    if (role === "vendor") {
      user = await vendorModel.findById(userId).select("-password");
    } else {
      user = await userModel.findById(userId).select("-password");
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let updated;

    if (role === "vendor") {
      updated = await vendorModel.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
    } else {
      updated = await userModel.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
    }

    res.json({ user: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProfile, updateProfile };