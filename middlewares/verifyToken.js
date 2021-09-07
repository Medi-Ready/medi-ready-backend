const { decode } = require("../utils/jwt");
const userService = require("../services/user.service");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    if (!token) {
      throw createError(401, "Unauthorized");
    }

    const userInfo = decode(token);
    const user = await userService.findUser(userInfo);

    if (!user) {
      throw createError(403, "Forbidden");
    }

    res.locals.userInfo = userInfo;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
