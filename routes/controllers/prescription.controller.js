const userService = require("../../services/user.service");
const medicineService = require("../../services/medicine.service");
const prescriptionService = require("../../services/prescription.service");

exports.postPrescription = async (req, res, next) => {
  const userId = req.userInfo.user_id;
  const { medicines, duration, patient_id } = req.body;

  try {
    const pharmacistId = await userService.findPharmacistId(userId);

    const prescriptionId = await prescriptionService.create(duration, patient_id, pharmacistId);

    userService.dequeue(patient_id);
    medicineService.createMany(medicines, prescriptionId);
    prescriptionService.createDoseHistory(patient_id, prescriptionId);

    res.json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.getPrescriptionList = async (req, res, next) => {
  try {
    const { userInfo } = req;
    let prescriptions = null;

    if (!userInfo) {
      return res.json({ result: "fail", message: "unauthorized" });
    }

    if (userInfo.user_type === "patient") {
      prescriptions = await prescriptionService.getPatientPrescriptionList(userInfo);
    }

    if (userInfo.user_type === "pharmacist") {
      prescriptions = await prescriptionService.getPharmacistPrescriptionList(userInfo);
    }

    if (!prescriptions) {
      return res.json({ result: "fail" });
    }

    res.json({ result: "success", data: prescriptions });
  } catch (error) {
    next(error);
  }
};

exports.getPrescriptionDetails = async (req, res, next) => {
  const { prescriptionId } = req.params;

  try {
    const details = await prescriptionService.getDetails(prescriptionId);

    res.json({ result: "success", data: details });
  } catch (error) {
    res.json({ result: "fail" });
  }
};
