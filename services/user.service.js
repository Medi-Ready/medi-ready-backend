const { User } = require("../models");

exports.findUser = async (userInfo) => {
  const { email, user_type } = userInfo;

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

exports.create = async (userInfo) => {
  try {
    return await User.create(userInfo);
  } catch (error) {
    throw error;
  }
};
