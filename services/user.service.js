const { User } = require("../models");

exports.findUser = async (userData) => {
  const { email, user_type } = userData;

  try {
    return await User.findOne({
      where: {
        email,
        user_type,
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.create = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw error;
  }
};
