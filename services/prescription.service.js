const {
  User,
  Patient,
  DoseDay,
  Medicine,
  Pharmacist,
  DoseHistory,
  Prescription,
  MedicineDetail,
} = require("../models");
const userService = require("./user.service");

exports.getPatientPrescriptions = async (userInfo) => {
  try {
    const patient = await userService.findPatient(userInfo);
    const patientId = patient["patient.patient_id"];

    const prescriptions = await Prescription.findAll({
      where: {
        fk_patient_id: patientId,
      },
      include: [
        { model: DoseDay },
        { model: Medicine },
        { model: Pharmacist },
        { model: DoseHistory },
      ],
      where: { fk_patient_id: patientId },
    });

    return prescriptions;
  } catch (error) {
    throw error;
  }
};

exports.getPharmacistPrescriptions = async (userInfo) => {
  try {
    const pharmacist = await userService.findPharmacist(userInfo);
    const pharmacistId = pharmacist["pharmacist.pharmacist_id"];

    const prescriptions = await Prescription.findAll({
      where: {
        fk_pharmacist_id: pharmacistId,
      },
      where: { fk_pharmacist_id: pharmacistId },
      include: [
        { model: Pharmacist },
        { model: Medicine },
        { model: DoseHistory },
        { model: DoseDay },
      ],
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
        { model: Pharmacist, include: [{ model: User }] },
        { model: Patient, include: [{ model: User }] },
        { model: DoseHistory },
        { model: DoseDay },
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
