const createError = require("http-errors");

const { encode } = require("../../utils/jwt");
const userService = require("../../services/user.service");

exports.login = async (req, res, next) => {
  try {
    const userInfo = req.body;

    if (!userInfo) {
      throw createError(400, "Invalid user data");
    }

    const user = await userService.findUser(userInfo);

    if (user) {
      const token = encode(userInfo);

      res.status(200).json({
        result: "login success",
        user,
        token,
      });
    } else {
      const user = await userService.create(userInfo);
      const token = encode(userInfo);

      res.status(201).json({
        result: "register success",
        user,
        token,
      });
    }
  } catch (err) {
    next(err);
  }
};
