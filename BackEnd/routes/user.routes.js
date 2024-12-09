const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller"); //just importing not by sperate seperate from this we will destructyre it...
const authMiddleware = require("../middleware/auth.middleware");
router.post(
  "/register",
  [
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First Name should be minimum 3 lettters"),
    body("fullName.lastName")
      .isLength({ min: 3 })
      .withMessage("Last Name should be minuim 3 letters"),
    body("email")
      .isEmail()
      .withMessage("Invalid Email- please provide the email"),
  ],
  userController.userRegister
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid Email-Please PRovide the Email"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Enter the Password with Min Length-3"),
  ],
  userController.userLogin
);

router.get("/profile", authMiddleware.authUser, userController.getProfile);
router.get("/logout", authMiddleware.authUser, userController.userLogout);

module.exports = router;
