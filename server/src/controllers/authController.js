const bcrypt = require("bcrypt");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const { hashPassword } = require("../helper/authHelper");
const { userModel } = require("../models/user");

const loginSchema = zod.object({
  email: zod.string().min(15).max(30).email(),
  password: zod.string().min(4).max(30),
});

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const valid = loginSchema.safeParse({ email, password });
    if (!valid.success) {
      return res.status(400).json({
        status: false,
        message: "Invalid format",
      });
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
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

const signupController = async (req, res) => {
  try {
    const body = zod.object({
      email: zod.string().min(15).max(30).email(),
      password: zod.string().min(4).max(30),
      name: zod.string().min(4).max(30),
      role: zod.string(),
    });

    const parsedBody = body.safeParse(req.body);

    if (!parsedBody.success) {
      res.json({
        status: false,
        message: "Incorrect format",
        error: parsedBody.error,
      });
      return;
    }

    const { name, email, password, role } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(200).send({
      status: true,
      message: "User Registered Sucessfully ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in signin",
      error,
    });
  }
};

module.exports = { signupController, loginController };
