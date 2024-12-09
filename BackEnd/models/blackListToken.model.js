const mongoose = require("mongoose");

const blackListTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"], 
      trim: true, 
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation time
      expires: 86400, // 24 hours in seconds; MongoDB TTL will handle expiration
    },
  },
  {
    timestamps: true, 
    versionKey: false, 
  }
);

// Add an index to ensure efficient querying (in case of token validation)
blackListTokenSchema.index({ token: 1 }, { unique: true });

const BlackListToken = mongoose.model("BlackListToken", blackListTokenSchema);

module.exports = BlackListToken;
