const createError = require("http-errors");

const { decode } = require("../utils/jwt");
const userService = require("../services/user.service");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    if (!token) {
      throw createError(401, "Unauthorized user");
    }

    const userInfo = decode(token);
    const user = await userService.findUser(userInfo);

    if (user) {
      req.userInfo = userInfo;

      return next();
    }

    res.json({ result: "Unauthorized user" });
  } catch (error) {
    next(error);
  }
};

exports.verifyToken = verifyToken;
