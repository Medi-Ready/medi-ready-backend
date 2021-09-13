const {
  User,
  Patient,
  Medicine,
  Pharmacist,
  DoseHistory,
  Prescription,
  MedicineDetail,
} = require("../models");
const userService = require("./user.service");

exports.getPatientPrescriptionList = async (userInfo) => {
  try {
    const patient = await userService.findPatient(userInfo);
    const patientId = patient["patient.patient_id"];

    const prescriptions = await Prescription.findAll({
      where: {
        fk_patient_id: patientId,
      },
      include: [
        { model: DoseHistory },
        {
          model: Pharmacist,
          include: [{ model: User }],
        },
        {
          model: Medicine,
          include: [{ model: MedicineDetail }],
        },
      ],
      order: [[DoseHistory, "date", "ASC"]],
    });

    return prescriptions;
  } catch (error) {
    throw error;
  }
};

exports.getPharmacistPrescriptionList = async (userInfo, page) => {
  try {
    const userId = userInfo.user_id;
    const pharmacistId = await userService.findPharmacistId(userId);
    const PAGE_LIMIT = 7;

    const prescriptions = await Prescription.findAll({
      where: { fk_pharmacist_id: pharmacistId },
      include: [
        { model: Medicine, include: [{ model: MedicineDetail }] },
        { model: Pharmacist },
        { model: DoseHistory },
        { model: Patient, include: [{ model: User }] },
      ],
      order: [[DoseHistory, "date", "DESC"]],
      limit: PAGE_LIMIT,
      offset: PAGE_LIMIT * page,
    });

    return prescriptions;
  } catch (error) {
    throw error;
  }
};

exports.getDetails = async (id) => {
  try {
    const details = Prescription.findOne({
      where: { prescription_id: id },
      include: [
        { model: DoseHistory },
        { model: Pharmacist, include: [{ model: User }] },
        { model: Patient, include: [{ model: User }] },
        {
          model: Medicine,
          include: [{ model: MedicineDetail }],
        },
      ],
    });

    return details;
  } catch (error) {
    throw error;
  }
};

exports.create = async (patientId, pharmacistId, duration, description) => {
  const DAY = 86400000;
  const expirationDate = new Date().getTime() + duration * DAY;

  try {
    const prescription = await Prescription.create({
      is_alarm_on: true,
      fk_patient_id: patientId,
      fk_pharmacist_id: pharmacistId,
      expiration_date: expirationDate,
      description,
    });

    return prescription.dataValues.prescription_id;
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
