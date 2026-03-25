const express = require("express");
const router = express.Router();

const { getProfile, updateProfile } = require("../controllers/profileController");
const { isLoggedIn } = require("../middlewares/authMiddleware");

// GET profile
router.get("/", isLoggedIn, getProfile);

// UPDATE profile
router.put("/", isLoggedIn, updateProfile);

module.exports = router;