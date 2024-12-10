const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "inactive",
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        trim: true,
      },
      type: {
        type: String,
        enum: ["auto", "motorcycle", "car"],
        required: true,
      },
      capacity: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
      },
      plate: {
        type: String,
        required: true,
        minlength: [3, "Vehicle number should be greater than 3 characters"],
        uppercase: true,
        trim: true,
      },
    },
    location: {
      lat: {
        type: Number,
        // required: true,
      },
      lng: {
        type: Number,
        // required: true,
      },
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes for better performance
captainSchema.index({ email: 1 });
captainSchema.index({ "vehicle.plate": 1 }, { unique: true });

// Instance Method: Generate JWT token
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  return token;
};

// Instance Method: Compare passwords
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static Method: Hash password
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Static Method: Find by captain ID for better performance
captainSchema.statics.findByCaptainId = function (captainId) {
  return this.findOne({ _id: captainId });
};

const CaptainModel = mongoose.model("CaptainModel", captainSchema);

module.exports = CaptainModel;
