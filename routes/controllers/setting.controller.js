const userService = require("../../services/user.service");

exports.updateInformation = async (req, res, next) => {
  try {
    const { user_id } = req.userInfo;
    const { name, address } = req.body;

    const pharmacistId = await userService.findPharmacistId(user_id);

    await userService.changePharmacistSetting(pharmacistId, name, address);

    res.json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.getInformation = async (req, res, next) => {
  try {
    const { user_id } = req.userInfo;

    const data = await userService.findPharmacistInfo(user_id);

    res.json({ result: "success", data });
  } catch (error) {
    next(error);
  }
};

exports.updateAlarmTime = async (req, res, next) => {
  try {
    const { user_id } = req.userInfo;
    const { alarmTime } = req.body;

    const patientId = await userService.findPatientId(user_id);

    await userService.changeAlarmSettings(patientId, alarmTime);

    res.json({ result: "success", data });
  } catch (error) {
    next(error);
  }
};
