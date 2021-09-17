const { encode } = require("../../utils/jwt");

const userService = require("../../services/user.service");

const DAY = 1000 * 60 * 60 * 24;
const cookieOptions = {
  path: "/",
  maxAge: DAY,
  httpOnly: true,
};

exports.login = async (req, res, next) => {
  try {
    const userInfo = req.body;

    if (!userInfo) {
      return res.json({ result: "fail", message: "Invalid user data" });
    }

    const user = await userService.findUser(userInfo);

    if (user) {
      const token = encode(user.dataValues);
      res.cookie("token", token, cookieOptions);

      return res.status(200).json({
        result: "success",
        data: user.dataValues,
      });
    }

    const newUser = await userService.createUser(userInfo);

    const token = encode(newUser.dataValues);
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      result: "success",
      data: newUser.dataValues,
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  res.clearCookie("token");
  res.json({ result: "success", message: "logout success" });
};

exports.authorize = async (req, res, next) => {
  const { user_type, user_id } = req.userInfo;

  if (user_type === "pharmacist") {
    const pharmacyInformation = await userService.findPharmacistInfo(user_id);

    return res.json({
      result: "success",
      message: "authorized",
      data: req.userInfo,
      pharmacyInformation,
    });
  }

  res.json({ result: "success", message: "authorized", data: req.userInfo });
};
