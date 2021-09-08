const { Prescription } = require("../models");
const userService = require("./user.service");

exports.getPatientPrescription = async (userInfo) => {
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
