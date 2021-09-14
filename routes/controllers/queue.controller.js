const queueService = require("../../services/queue.service");
const userService = require("../../services/user.service");

exports.registerQueue = async (req, res, next) => {
  try {
    const { userInfo } = req;
    const { userId } = req.body;

    if (!userInfo) {
      return res.json({ result: "fail", message: "unauthorized" });
    }

    if (!userId) {
      return res.json({ result: "fail", message: "invalid access" });
    }

    const pharmacistId = await userService.findPharmacistId(userId);

    const [queue] = await queueService.createQueue(pharmacistId);
    const queueId = queue.queue_id;

    const patientId = await userService.findPatientId(userId);

    await queueService.updateQueue(patientId, queueId);

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

    const people = await queueService.getQueueList(queueId);

    res.json({ result: "success", people });
  } catch (error) {
    next(error);
  }
};
