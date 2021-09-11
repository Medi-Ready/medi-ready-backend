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

    const [prescriptions] = await Prescription.findAll({
      where: {
        fk_patient_id: patientId,
      },
      include: [
        { model: Pharmacist },
        { model: DoseHistory },
        {
          model: Medicine,
          include: [
            {
              model: MedicineDetail,
            },
          ],
        },
      ],
    });

    return prescriptions;
  } catch (error) {
    throw error;
  }
};

exports.getPharmacistPrescriptionList = async (userInfo) => {
  try {
    const userId = req.userInfo.user_id;
    const pharmacistId = await userService.findPharmacistId(userId);

    const prescriptions = await Prescription.findAll({
      where: { fk_pharmacist_id: pharmacistId },
      include: [{ model: Medicine }, { model: Pharmacist }, { model: DoseHistory }],
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

exports.create = async (duration, patientId, pharmacistId) => {
  const DAY = 86400000;
  const expirationDate = new Date().getTime() + duration * DAY;

  try {
    const prescription = await Prescription.create({
      is_alarm_on: true,
      fk_patient_id: patientId,
      fk_pharmacist_id: pharmacistId,
      expiration_date: expirationDate,
    });

    return prescription.dataValues.prescription_id;
  } catch (error) {
    throw error;
  }
};

exports.createDoseHistory = async (patientId, prescriptionId) => {
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
