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
          include: [{
            model: MedicineDetail
          }],
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
    const pharmacist = await userService.findPharmacist(userInfo);
    const pharmacistId = pharmacist["pharmacist.pharmacist_id"];

    const prescriptions = await Prescription.findAll({
      where: { fk_pharmacist_id: pharmacistId },
      include: [
        { model: Medicine },
        { model: Pharmacist },
        { model: DoseHistory }
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
