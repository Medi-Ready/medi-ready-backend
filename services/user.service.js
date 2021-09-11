const { User, Patient, Pharmacist, Queue, Alarm } = require("../models");

exports.findOrCreate = async (userInfo) => {
  const { email, user_type, name, picture } = userInfo;

  try {
    const [user, isNewUser] = await User.findOrCreate({
      where: {
        name,
        email,
        picture,
        user_type,
      },
    });

    if (isNewUser && user_type === "pharmacist") {
      const pharmacist = await Pharmacist.create({
        fk_user_id: user.dataValues.user_id,
      });

      Queue.create({
        fk_pharmacist_id: pharmacist.dataValues.pharmacist_id,
      });
    }

    if (isNewUser && user_type === "patient") {
      const patient = await Patient.create({
        fk_user_id: user.dataValues.user_id,
      });

      Alarm.create({
        fk_patient_id: patient.dataValues.patient_id,
      });
    }

    return user;
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

exports.findPharmacistById = async (userId) => {
  try {
    return await Pharmacist.findOne({ pharmacist_id: userId });
  } catch (error) {
    throw error;
  }
};
