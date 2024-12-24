const BlackListToken = require("../models/blackListToken.model");
const UserModel = require("../models/user.model");
const userServices = require("../services/user.services");
const { validationResult } = require("express-validator");

module.exports.userRegister = async (req, res, next) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // Extract data from request body
    const {
      fullName: { firstName, lastName },
      email,
      password,
    } = req.body;
    const isUserExist = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: "User already registered with this email.",
      });
    }

    const hashedPassword = await UserModel.hashPassword(password); //Here there is no instance thats why using direct Model...
    console.log({ firstName, lastName, email, password });

    const user = await userServices.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Generate auth token
    const token = user.generateAuthToken(); //instance belongs to only one document

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token: token,
      data: user,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during user registration.",
    });
  }
};

module.exports.userLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    //check Email
    const user = await UserModel.findOne({ email }).select("+password");
    console.log("user Details", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password or Email",
        data: [],
      });
    }
    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password or Email",
        data: [],
      });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Ensures it's sent only over HTTPS in production
      secure:false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return res.status(200).json({
      success: true,
      message: "User Logined successfully.",
      token: token,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during user Login.",
    });
  }
};

module.exports.getProfile = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Profile Fetched Successfully",
    data: req.user,
  });
};

module.exports.userLogout = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: No token provided for logout.",
      });
    }

    await BlackListToken.create({ token });

    // Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
      // secure: process.env.NODE_ENV === "production", // Enable in production
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error("Error during logout:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error during logout.",
    });
  }
};
