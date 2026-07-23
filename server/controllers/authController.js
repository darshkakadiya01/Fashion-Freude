const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// Register
// ===============================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const exist = await User.findOne({
      where: { email },
    });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create User
    await User.create({
      name,
      email,
      password: hashPassword,
      role: "user",
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Login
// ===============================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find User
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // Compare Password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate Token
    const token = jwt.sign(
      {
        id: user.id, // Sequelize uses id instead of _id
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};