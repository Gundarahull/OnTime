const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        minlength: [3, "First Name should be at least 3 characters long"],
      },
      lastName: {
        type: String,
        required: true,
        minlength: [3, "Last Name should be at least 3 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Exclude this field in query results by default
    },
    socketId: {
      type: String, // Reserved for future use
    },
  },
  { timestamps: true } // Corrected the option name
);

// Instance Method: Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h", //  Add an expiration time
  });
  return token;
};

// Instance Method: Compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static Method: Hash password
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

//For Better Performance
userSchema.statics.findByUserId = function (userId) {
  return this.findOne({ _id: userId });
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
