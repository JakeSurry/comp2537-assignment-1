import User from "../models/User.js";
import { logEvent } from "../services/activity.service.js";

async function register(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({
        success: false,
        message: "Username and password are required",
      });
    }
    if (password.length < 8) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const exists = await User.findOne({ username });
    if (exists) {
      return res
        .status(409)
        .send({ success: false, message: "Username already registered" });
    }

    const user = await User.create({ username, password });
    const log = await logEvent(user._id, "register", "User registered");

    res.status(201).send({
      success: true,
      message: `Registration successful`,
      log,
    });
  } catch (err) {
    console.error("Register error:", err);
    res
      .status(500)
      .send({ success: false, message: "Server error during registration" });
  }
}

async function unregister(req, res) {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    await user.deleteOne();
    const log = await logEvent(user._id, "unregister", "User unregistered");

    await req.session.destroy((err) => {
      if (err) console.error("Session destroy error:", err);
      res.clearCookie("connect.sid");
      res.send({
        success: true,
        message: `Account deleted successfully (id: ${user._id})`,
        log,
      });
    });
  } catch (err) {
    console.error("Unregister error:", err);
    res
      .status(500)
      .send({ success: false, message: "Server error during unregistration" });
  }
}

async function login(req, res) {
  try {
    const { username, password, rememberMe } = req.body;

    if (!username || !password) {
      return res.status(400).send({
        success: false,
        message: "Username and password are required",
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "Username not found" });
    }
    if (!(await user.comparePassword(password))) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password, please try again",
      });
    }

    req.session.regenerate(async (err) => {
      if (err) {
        return res
          .status(500)
          .send({ success: false, message: "Server error during login" });
      }
      req.session.userId = user._id;
      req.session.role = user.role;
      if (rememberMe) {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
      } else {
        req.session.cookie.maxAge = null;
      }
      const log = await logEvent(user._id, "login", "User log in");
      res.status(200).send({
        success: true,
        message: "Log in successful",
        user: { _id: user._id, username: user.username, role: user.role },
        log,
      });
    });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .send({ success: false, message: "Server error during log in" });
  }
}

async function logout(req, res) {
  const user = await User.findById(req.session.userId);
  req.session.destroy(async (err) => {
    if (err) {
      console.error("Logout error:", err);
      return res
        .status(500)
        .send({ success: true, message: "Server error during logout" });
    }
    res.clearCookie("connect.sid");
    const log = await logEvent(user._id, "logout", "User log out");
    res.status(200).send({ success: true, message: "Log out successful", log });
  });
}

async function me(req, res) {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).send({ success: true, message: "User not found" });
    }
    res.send({
      success: true,
      message: `Authenticated as ${user.username} (id: ${user._id})`,
      user: { _id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    console.error("Me error:", err);
    res.status(500).send({ sucess: false, message: "Server error during me" });
  }
}

export { register, unregister, login, logout, me };
