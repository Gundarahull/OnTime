const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const BlackListToken = require("../models/blackListToken.model");
const CaptainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided.",
      });
    }

    const isBlacklisted = await BlackListToken.exists({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token is blacklisted.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the decoded token payload
    const user = await UserModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized: User not found.",
      });
    }

    // Attach the user to the request object for further use
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error during authorization:", error.message);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token has expired.",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token.",
      });
    }

    // General error response
    return res.status(500).json({
      success: false,
      message: "Internal server error during authorization.",
    });
  }
};


module.exports.authCaptain = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided.",
      });
    }

    const isBlacklisted = await BlackListToken.exists({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token is blacklisted.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the decoded token payload
    const user = await CaptainModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized: Captain not found.",
      });
    }

    // Attach the Captain to the request object for further use
    req.captain = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error during authorization:", error.message);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token has expired.",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token.",
      });
    }

    // General error response
    return res.status(500).json({
      success: false,
      message: "Internal server error during authorization.",
    });
  }
};

