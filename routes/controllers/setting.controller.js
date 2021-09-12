const userService = require("../../services/user.service");

exports.changeSetting = async (req, res, next) => {
  try {
    const { user_id } = req.userInfo;
    const { name, address } = req.body;

    const pharmacistId = await userService.findPharmacistId(user_id);

    const test = await userService.changePharmacistSetting(pharmacistId, name, address);
    console.log(test);

    res.json({ result: "success", date: test });
  } catch (error) {
    next(error);
  }
};
