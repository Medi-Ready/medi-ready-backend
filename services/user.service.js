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
