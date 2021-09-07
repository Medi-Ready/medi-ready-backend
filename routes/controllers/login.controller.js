const createError = require("http-errors");

const { encode } = require("../../utils/jwt");
const userService = require("../../services/user.service");

exports.login = async (req, res, next) => {
  try {
    const userData = req.body;

    if (!userData) {
      throw createError(400, "Invalid user data");
    }

    const user = await userService.findUser(userData);

    if (user) {
      const token = encode(userData);

      res.status(200).json({
        result: "login success",
        user,
        token,
      });
    } else {
      const user = await userService.create(userData);
      const token = encode(userData);

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
