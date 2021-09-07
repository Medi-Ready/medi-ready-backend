const createError = require("http-errors");

const { encode } = require("../../utils/jwt");
const userService = require("../../services/user.service");

const DAY = 1000 * 60 * 60 * 24;
const cookieOptions = {
  path: "/",
  sameSite: true,
  maxAge: DAY,
  httpOnly: true,
};

exports.login = async (req, res, next) => {
  try {
    const userInfo = req.body;

    if (!userInfo) {
      throw createError(400, "Invalid user data");
    }

    const user = await userService.findOrCreate(userInfo);

    if (user) {
      const token = encode(userInfo);
      res.cookie("token", token, cookieOptions);

      res.status(200).json({
        result: "login success",
        user,
        token,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  res.clearCookie("token");
  res.json({ result: "logout success" });
};