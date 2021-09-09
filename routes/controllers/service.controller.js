const queueService = require("../../services/queue.service");
const userService = require("../../services/user.service");

exports.registerQueue = async (req, res, next) => {
  try {
    const { userInfo } = req;
    const { userId } = req.body;

    if (!userInfo) {
      return res.json({ result: "fail", message: "unauthorized" });
    }

    const pharmacist = await userService.findPharmacistById(userId);
    const pharmacistId = pharmacist.dataValues.pharmacist_id;

    const [queue] = await queueService.createQueue(pharmacistId);
    const queueId = queue.queue_id;

    await queueService.updateQueue(userInfo, queueId);

    res.json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.getQueue = async (req, res, next) => {
  try {
    const { user_id } = req.userInfo;

    const queue = await queueService.findQueue(user_id);
    const queueId = queue["queue.queue_id"];

    const people = await queueService.getPeopleList(queueId);

    res.json({ result: "success", data: people });
  } catch (error) {
    next(error);
  }
};
