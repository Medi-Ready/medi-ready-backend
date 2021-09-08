const createError = require("http-errors");

const prescriptionService = require("../../services/prescription.service");

exports.getPrescriptions = async (req, res, next) => {
  try {
    const { userInfo } = req;
    let prescriptions = null;

    if (!userInfo) {
      throw createError(400, "unauthorized");
    }

    if (userInfo.user_type === "patient") {
      prescriptions = await prescriptionService.getPatientPrescriptions(userInfo);
    }

    if (userInfo.user_type === "pharmacist") {
      prescriptions = await prescriptionService.getPharmacistPrescriptions(userInfo);
    }

    if (!prescriptions) {
      res.json({ result: "fail" });
    }

    res.json({ result: "success", data: prescriptions });
  } catch (error) {
    next(error);
  }
};
