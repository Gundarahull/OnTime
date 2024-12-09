const UserModel = require("../models/user.model");

module.exports.createUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  console.log("In the Service...",{ firstName, lastName, email, password });
  
  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please fill all the fields");
  }
  //need to check email is exist or not..

  const user = UserModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
  });

  return user;
};
