const historyService = require("../../services/history.service");

exports.updateDoseHistory = async (req, res, next) => {
  try {
    const doseHistory = req.body;
    const { doseHistoryId } = req.params;

    await historyService.updateHistory(doseHistoryId, doseHistory);
    const prescription = await historyService.findPrescription(doseHistoryId);
    const prescriptionId = prescription.dataValues["fk_prescription_id"];

    const updatedHistory = { ...doseHistory, prescription_id: prescriptionId };

    res.json({ result: "success", data: updatedHistory });
  } catch (error) {
    next(error);
  }
};
