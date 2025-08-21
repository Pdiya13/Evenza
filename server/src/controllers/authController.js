const bcrypt = require("bcrypt");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const { hashPassword } = require("../helper/authHelper");
const { userModel } = require("../models/user");
const vendorModel = require("../models/vendor");

const loginSchema = zod.object({
  email: zod.string().min(15).max(30).email(),
  password: zod.string().min(4).max(30),
});

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const valid = loginSchema.safeParse({ email, password });
    if (!valid.success) {
      return res.status(400).json({
        status: false,
        message: "Invalid format",
      });
    }

    const user = await userModel.findOne({ email: email, role: "user" });
    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).send({
      status: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const vendorLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const valid = loginSchema.safeParse({ email, password });
    if (!valid.success) {
      return res.status(400).json({
        status: false,
        message: "Invalid format",
      });
    }

    const vendor = await vendorModel.findOne({ email: email, role: "vendor" });
    if (!vendor) {
      return res
        .status(400)
        .json({ status: false, message: "Vendor not found" });
    }

    const match = await bcrypt.compare(password, vendor.password);
    if (!match) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: vendor._id, role: vendor.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).send({
      status: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const userSignupController = async (req, res) => {
  try {
    console.log("enterr")
    const body = zod.object({
      email: zod.string().min(5).max(30).email(),
      password: zod.string().min(4).max(30),
      phone: zod
        .string()
        .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number format"),
      name: zod.string().min(2).max(30),
      role: zod.literal("user"),
    });

    const parsedBody = body.safeParse(req.body);
    console.log(parsedBody.success);
    if (!parsedBody.success) {
      return res.status(400).json({
        status: false,
        message: "Incorrect format",
        error: parsedBody.error,
      });
    }

    const { name, email, phone, password, role } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Email already in use" });
    }

    const existingPhone = await userModel.findOne({ phone });
    if (existingPhone) {
      return res
        .status(400)
        .json({ status: false, message: "Phone number already in use" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(200).send({
      status: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error in user signup",
      error,
    });
  }
};

const vendorSignupController = async (req, res) => {
  try {
    const body = zod.object({
      name: zod.string().min(2).max(30),
      email: zod.string().min(5).max(30).email(),
      password: zod.string().min(4).max(30),
      phone: zod
        .string()
        .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number format"),
      category: zod.string().min(3).max(30),
      price: zod.number().min(0),
      experience: zod.number().min(0),
      role: zod.literal("vendor"),
    });

    const parsedBody = body.safeParse(req.body);

    if (!parsedBody.success) {
      return res.json({
        status: false,
        message: "Incorrect format",
        error: parsedBody.error,
      });
    }

    const { name, email, password,phone ,  category, price, experience, role } =
      req.body;
    console.log(req.body);

    const existingVendor = await vendorModel.findOne({ email });
    if (existingVendor) {
      return res
        .status(400)
        .json({ status: false, message: "Email already in use" });
    }
    const hashedPassword = await hashPassword(password);
    const newVendor = new vendorModel({
      name,
      email,
      password: hashedPassword,
      phone,
      category,
      price,
      experience,
      role,
    });

    await newVendor.save();

    res.status(200).send({
      status: true,
      message: "Vendor Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error in vendor signup",
      error,
    });
  }
};

module.exports = {
  userLoginController,
  vendorLoginController,
  userSignupController,
  vendorSignupController,
};
