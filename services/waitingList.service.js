const { WaitingList } = require("../models");

exports.create = async (pharmacistId) => {
  try {
    return await WaitingList.findOrCreate({
      where: { fk_pharmacist_id: pharmacistId },
      raw: true,
    });
  } catch (error) {
    throw error;
  }
};
