const { Queue, Pharmacist, Patient, User } = require("../models");

exports.createQueue = async (pharmacistId) => {
  try {
    return await Queue.findOrCreate({
      where: { fk_pharmacist_id: pharmacistId },
      raw: true,
    });
  } catch (error) {
    throw error;
  }
};

exports.updateQueue = async (userInfo, queueId) => {
  try {
    return await Patient.update(
      { fk_queue_id: queueId },
      {
        where: { fk_user_id: userInfo.user_id },
      }
    );
  } catch (error) {
    throw error;
  }
};

exports.findQueue = async (pharmacistId) => {
  return await Pharmacist.findOne({
    include: [
      {
        model: Queue,
      },
    ],
    where: { fk_user_id: pharmacistId },
    raw: true,
  });
};

exports.getQueueList = async (queueId) => {
  return await Patient.findAll({
    where: { fk_queue_id: queueId },
    include: [{
      model: User
    }],
  });
};
