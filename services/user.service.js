const { User, Patient, Pharmacist } = require("../models");

exports.findOrCreate = async (userInfo) => {
  const { email, user_type, name, picture } = userInfo;

  try {
    return await User.findOrCreate({
      where: {
        name,
        email,
        picture,
        user_type,
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.findUser = async (userInfo) => {
  const { email, user_type } = userInfo;

  try {
    return await User.findOne({
      where: {
        email,
        user_type,
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.findPatient = async (userInfo) => {
  const { email, user_type } = userInfo;

  try {
    return await User.findOne({
      include: [
        {
          model: Patient,
          attributes: ["patient_id"],
        },
      ],
      raw: true,
      where: {
        email,
        user_type,
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.findPharmacist = async (userInfo) => {
  const { email, user_type } = userInfo;

  try {
    return await User.findOne({
      include: [
        {
          model: Pharmacist,
          attributes: ["pharmacist_id"],
        },
      ],
      raw: true,
      where: {
        email,
        user_type,
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.updateWaitingStatus = async (userInfo, waitingListId) => {
  try {
    return await Patient.update(
      { fk_waiting_list_id: waitingListId },
      {
        where: { fk_user_id: userInfo.user_id },
      }
    );
  } catch (error) {
    throw error;
  }
};
