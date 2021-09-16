const userService = require("../../services/user.service");

exports.updatePushNotification = async (req, res, next) => {
  try {
    const { user_id } = req.userInfo;
    const { notificationToken } = req.body;

    await userService.updateNotificationToken(user_id, notificationToken);

    res.json({ result: "success" });
  } catch (error) {
    next(error);
  }
};
