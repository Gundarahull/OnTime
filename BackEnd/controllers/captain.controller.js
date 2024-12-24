const CaptainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const CaptainServices = require("../services/captain.services");
const BlackListToken = require("../models/blackListToken.model");

module.exports.captainRegister = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // Destructure input fields
    const {
      fullName: { firstName, lastName },
      email,
      password,
      vehicle: { color, type, capacity, plate },
    } = req.body;

    // Check if captain with email already exists
    const isCaptainExist = await CaptainModel.findOne({
      email: email.toLowerCase(),
    });

    if (isCaptainExist) {
      return res.status(409).json({
        success: false,
        message: "Captain already registered with this email.",
      });
    }

    const isVehicleExist = await CaptainModel.findOne({
      "vehicle.plate": plate,
    });

    if (isVehicleExist) {
      return res.status(409).json({
        success: false,
        message: "Vehicle already registered with this Number.",
      });
    }

    // Hash the password
    const hashedPassword = await CaptainModel.hashPassword(password);

    // Create the captain
    const captain = await CaptainServices.createCaptain({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      color,
      type,
      capacity,
      plate: plate.toUpperCase(),
    });

    // Generate JWT token
    const token = captain.generateAuthToken();

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Captain registered successfully.",
      token,
      data: captain,
    });
  } catch (error) {
    console.error("Error during captain registration:", error.message);

    // Send generic error response
    return res.status(500).json({
      success: false,
      message: "Internal server error during captain registration.",
    });
  }
};

module.exports.captainLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    const captain = await CaptainModel.findOne({
      email: email.toLowerCase(),
    }).select("+password");
    if (!captain) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    //match password
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    //generate Ayth token
    const token = await captain.generateAuthToken();

    const captainData = captain.toObject(); // Convert Mongoose document to plain object
    delete captainData.password; // Remove password field
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Ensures it's sent only over HTTPS in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return res.status(200).json({
      success: true,
      messsage: "Captain Logged In Succesfully",
      token: token,
      //   data: captain,
    });
  } catch (error) {
    console.error("Error during captain Login:", error.message);

    // Send generic error response
    return res.status(500).json({
      success: false,
      message: "Internal server error during captain Login.",
    });
  }
};

module.exports.getCaptainProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Captain Profile Fetched Successfully",
    data: req.captain,
  });
};

module.exports.captainLogout = async (req, res) => {
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
    console.error("Error during Captain logout:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error during Captain logout.",
    });
  }
};
