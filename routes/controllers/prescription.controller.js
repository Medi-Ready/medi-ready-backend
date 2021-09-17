const userService = require("../../services/user.service");
const historyService = require("../../services/history.service");
const medicineService = require("../../services/medicine.service");
const prescriptionService = require("../../services/prescription.service");

exports.postPrescription = async (req, res, next) => {
  const userId = req.userInfo.user_id;
  const { medicines, duration, patient_id, description, doseTimes } = req.body;

  try {
    const pharmacistId = await userService.findPharmacistId(userId);

    const prescriptionId = await prescriptionService.create(
      patient_id,
      pharmacistId,
      duration || 3,
      description || "description",
      doseTimes
    );

    await userService.dequeue(patient_id);
    await userService.registerPushNotification(patient_id, duration, doseTimes);
    await medicineService.increaseFrequency(medicines);
    await medicineService.createMany(medicines, prescriptionId);
    await historyService.createDoseHistory(patient_id, prescriptionId, duration);

    res.json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.getPrescriptionList = async (req, res, next) => {
  try {
    const { userInfo } = req;
    const { user_id } = req.userInfo;

    if (!userInfo) {
      return res.json({ result: "fail", message: "unauthorized" });
    }

    if (userInfo.user_type === "patient") {
      const prescriptions = await prescriptionService.getPatientPrescriptionList(user_id);

      return res.json({ result: "success", data: prescriptions });
    }

    if (userInfo.user_type === "pharmacist") {
      const page = parseInt(req.query.page, 10) || 0;

      const prescriptions = await prescriptionService.getPharmacistPrescriptionList(userInfo, page);
      const hasMoreData = prescriptions.length === 7;

      res.json({ result: "success", prescriptions, hasMoreData });
    }
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

exports.updateAlarm = async (req, res, next) => {
  const { prescriptionId } = req.params;

  try {
    const result = await prescriptionService.toggleAlarm(prescriptionId);

    res.json({ result: "success", data: result });
  } catch (error) {
    res.json({ result: "fail" });
  }
};

exports.deletePrescription = async (req, res, next) => {
  const { prescriptionId } = req.params;

  try {
    await prescriptionService.toggleIsDeleted(prescriptionId);

    res.json({ result: "success" });
  } catch (error) {
    res.json({ result: "fail" });
  }
};
