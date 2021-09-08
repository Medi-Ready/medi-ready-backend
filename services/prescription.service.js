const { Prescription } = require("../models");
const userService = require("./user.service");

exports.getPatientPrescriptions = async (userInfo) => {
  try {
    const patient = await userService.findPatient(userInfo);
    const patientId = patient["patient.patient_id"];

    const prescriptions = await Prescription.findAll({
      where: {
        fk_patient_id: patientId,
      },
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
    });

    return prescriptions;
  } catch (error) {
    throw error;
  }
};
