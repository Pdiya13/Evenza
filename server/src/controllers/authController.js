const bcrypt = require("bcrypt");
const zod = require("zod");
const jwt = require("jwt");
const loginSchema = zod.object({
  email: zod.string().email({ message: "Invalid email" }),
  password: zod
    .string()
    .min(6, { message: "Password must be at least 6 chars" }),
});

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const valid = loginSchema.safeParse({ email, password });
  if (!valid.success) {
    return res.status(400).json({
      status: false,
      message: "Invalid Credentials",
    });
  }

  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.create(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  return res.json({
    status: true,
    message: "Login successful",
    token,
  });
};

module.exports = { loginController };
