const User = require("../Models/User.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Controller
exports.registerUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password with a salt
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    const newUser = new User({
      userName,
      email,
      password: hashedPassword, // Store the hashed password
      role: role || "user", // Assign 'user' as default if role is not provided
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "Registration successful!", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to register user", message: error.message });
  }
};

// Login Controller
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Generate a token with role
    const token = jwt.sign(
      {
        id: user._id,
        username: user.userName, // Add username to the token payload
        email: user.email, // Add email to the token payload
        role: user.role, // Include the role in the token
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", 
      }
    );

    // Send back token and user details in the response
    res.status(200).json({
      message: "Login successful!",
      token,
      user: { username: user.userName, email: user.email, role: user.role }, // Include user details in response
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed", message: error.message });
  }
};
