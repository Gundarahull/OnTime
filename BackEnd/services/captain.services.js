const CaptainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  capacity,
  plate,
  type,
}) => {
  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !color ||
      !capacity ||
      !plate ||
      !type
    ) {
      throw new Error("All Fields are Required");
    }
    const captain = await CaptainModel.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle: {
        color,
        capacity,
        plate,
        type,
      },
    });
    return captain;
  } catch (error) {
    console.error("Error while creating captain:", error.message);
    throw new Error(error.message || "Failed to create captain");
  }
};
