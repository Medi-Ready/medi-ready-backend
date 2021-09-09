const prescriptionService = require("../../services/prescription.service");

exports.getPrescriptionsList = async (req, res, next) => {
  try {
    const { userInfo } = req;
    let prescriptions = null;

    if (!userInfo) {
      return res.json({ result: "fail", message: "unauthorized" });
    }

    if (userInfo.user_type === "patient") {
      prescriptions = await prescriptionService.getPatientPrescriptions(userInfo);
    }

    if (userInfo.user_type === "pharmacist") {
      prescriptions = await prescriptionService.getPharmacistPrescriptions(userInfo);
    }

    if (!prescriptions) {
      return res.json({ result: "fail" });
    }

    res.json({ result: "success", data: prescriptions.dataValues });
  } catch (error) {
    next(error);
  }
};

exports.getPrescriptionDetails = async (req, res, next) => {
  const { prescriptionId } = req.params;

  const details = await prescriptionService.getDetails(prescriptionId);

  res.json({ result: "success", data: details });
};
