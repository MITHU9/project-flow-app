import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, passwordHash });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-passwordHash");
  res.json(user);
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-passwordHash");
  res.json(users);
};
