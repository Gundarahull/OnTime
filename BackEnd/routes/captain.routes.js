const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/register",
  [
    body("fullName.firstName")
      .isString()
      .isLength({ min: 3 })
      .withMessage("First name should be at least 3 characters."),
    body("fullName.lastName")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Last name should be at least 3 characters."),
    body("email").isEmail().withMessage("Invalid email address."),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password should be at least 3 characters long."),
    body("vehicle.color")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Vehicle color should be at least 3 characters."),
    body("vehicle.type")
      .isIn(["auto", "motorcycle", "car"])
      .withMessage("Vehicle type must be one of: auto, motorcycle, car."),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be at least 1."),
    body("vehicle.plate")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Vehicle plate should be at least 3 characters."),
  ],
  captainController.captainRegister
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email Address"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password should be at least 3 characters long."),
  ],
  captainController.captainLogin
);

router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.getCaptainProfile
);
router.get(
  "/logout",
  authMiddleware.authCaptain,
  captainController.captainLogout
);

router.use((err, req, res, next) => {
  console.error("Unexpected error in Captain Routes:", err);
  res.status(500).json({
    success: false,
    message:
      err.message || "An unexpected error occurred. Please try again later.",
  });
});

module.exports = router;
