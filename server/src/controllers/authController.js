const bcrypt = require("bcrypt");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const { hashPassword, comparePassword } = require("../helper/authHelper");
const { userModel } = require("../models/user");

const loginSchema = zod.object({
  email: z.string().min(15).max(30).email(),
  password: z.string().min(4).max(30),
});

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const valid = loginSchema.safeParse({ email, password });
  if (!valid.success) {
    return res.status(401).json({
      status: false,
      message: "Invalid Format",
    });
  }

  const user = userModel.find({ email: email });
  if(!user)
  {
     return res.status(401).json({ message: "User not Found" });
  }

  const match = comparePassword(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.create(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  return res.status(200).send({
    status: true,
    message: "Login successful",
    token,
  });
};

const signupController = async (req, res) => {
  try {
    const body = z.object({
      email: z.string().min(15).max(30).email(),
      password: z.string().min(4).max(30),
      name: z.string().min(4).max(30),
      role: z.string(),
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

    const user = userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
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
