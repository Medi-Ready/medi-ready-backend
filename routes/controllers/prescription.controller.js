const userService = require("../../services/user.service");
const medicineService = require("../../services/medicine.service");
const prescriptionService = require("../../services/prescription.service");

exports.postPrescription = async (req, res, next) => {
  const userId = req.userInfo.user_id;
  const { medicines, duration, patient_id, description } = req.body;

  try {
    const pharmacistId = await userService.findPharmacistId(userId);

    const prescriptionId = await prescriptionService.create(
      patient_id,
      pharmacistId,
      duration || 3,
      description || "description"
    );

    await userService.dequeue(patient_id);
    await medicineService.createMany(medicines, prescriptionId);
    await prescriptionService.createDoseHistory(patient_id, prescriptionId, duration);

    res.json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.getPrescriptionList = async (req, res, next) => {
  try {
    const { userInfo } = req;

    if (!userInfo) {
      return res.json({ result: "fail", message: "unauthorized" });
    }

    if (userInfo.user_type === "patient") {
      const prescriptions = await prescriptionService.getPatientPrescriptionList(userInfo);

      return res.json({ result: "success", data: prescriptions });
    }

    if (userInfo.user_type === "pharmacist") {
      const page = parseInt(req.query.page) || 0;

      const prescriptions = await prescriptionService.getPharmacistPrescriptionList(userInfo, page);
      const hasMore = prescriptions.length === 7;

      res.json({ result: "success", prescriptions, hasMore });
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
