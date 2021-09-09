const waitingListService = require("../../services/waitingList.service");
const userService = require("../../services/user.service");

exports.registerOnList = async (req, res, next) => {
  try {
    const { userInfo } = req;
    const { pharmacistId } = req.params;

    if (!userInfo) {
      return res.json({ result: "fail", message: "unauthorized" });
    }

    const [waitingList] = await waitingListService.create(pharmacistId);
    const waitingListId = waitingList.waiting_list_id;

    await userService.updateWaitingStatus(userInfo, waitingListId);

    res.json({ result: "success", data: userInfo });
  } catch (error) {
    next(error);
  }
};
