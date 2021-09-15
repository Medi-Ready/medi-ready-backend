const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");

const loginController = require("./controllers/login.controller");
const queueController = require("./controllers/queue.controller");
const settingController = require("./controllers/setting.controller");
const historyController = require("./controllers/history.controller");
const medicineController = require("./controllers/medicine.controller");
const prescriptionController = require("./controllers/prescription.controller");

router.post("/login", loginController.login);
router.post("/logout", loginController.logout);
router.get("/auth-check", verifyToken, loginController.authorize);

router.post("/prescription", verifyToken, prescriptionController.postPrescription);
router.get("/prescriptions", verifyToken, prescriptionController.getPrescriptionList);
router.get(
  "/prescriptions/:prescriptionId",
  verifyToken,
  prescriptionController.getPrescriptionDetails
);

router.put("/alarms/:prescriptionId", verifyToken, prescriptionController.updateAlarm);
router.put("/doseHistory/:doseHistoryId", verifyToken, historyController.updateDoseHistory);

router.post("/medicine", verifyToken, medicineController.getMedicineDetails);
router.get("/medicines", verifyToken, medicineController.getMedicineNames);

router.get("/queue", verifyToken, queueController.getQueue);
router.post("/queue", verifyToken, queueController.registerQueue);

router.get("/settings/information", verifyToken, settingController.getInformation);
router.put("/settings/information", verifyToken, settingController.updateInformation);
router.put("/settings/alarm-time", verifyToken, settingController.updateAlarmTime);

module.exports = router;
