const { DoseHistory } = require("../models");

exports.updateHistory = async (id, data) => {
  const { morning, lunch, dinner, beforeBed } = data;

  try {
    return await DoseHistory.update(
      {
        morning,
        lunch,
        dinner,
        before_bed: beforeBed,
      },
      {
        where: {
          dose_history_id: id,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

exports.createDoseHistory = async (patientId, prescriptionId, duration) => {
  const DAY = 86400000;
  const now = new Date().getTime();
  const expirationDate = new Date().getTime() + duration * DAY;

  let count = 0;

  while (now + count * DAY <= expirationDate) {
    await DoseHistory.create({
      fk_prescription_id: prescriptionId,
      fk_patient_id: patientId,
      date: now + count * DAY,
    });

    count += 1;
  }
};

exports.findPrescription = async (id) => {
  return await DoseHistory.findOne({
    where: {
      dose_history_id: id,
    },
  });
};
