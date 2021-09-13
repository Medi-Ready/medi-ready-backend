const userService = require("../../services/user.service");

exports.changeSetting = async (req, res, next) => {
  try {
    const { user_id } = req.userInfo;
    const { name, address } = req.body;

    const pharmacistId = await userService.findPharmacistId(user_id);

    const changed = await userService.changePharmacistSetting(pharmacistId, name, address);

    res.json({ result: "success", data: changed });
  } catch (error) {
    next(error);
  }
};
