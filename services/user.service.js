const { User } = require("../models");

exports.findOrCreate = async (userInfo) => {
  const { email, user_type, name, picture } = userInfo;

  try {
    return await User.findOrCreate({
      where: {
        name,
        email,
        picture,
        user_type,
      },
    });
  } catch (error) {
    throw error;
  }
};

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
