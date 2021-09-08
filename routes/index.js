const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const loginController = require("./controllers/login.controller");
const prescriptionController = require("./controllers/prescription.controller");

router.post("/login", loginController.login);
router.post("/logout", loginController.logout);
router.get("/auth-check", verifyToken, loginController.authorize);

router.get("/prescriptions", verifyToken, prescriptionController.getPrescriptionsList);
router.get(
  "/prescriptions/:prescriptionId",
  verifyToken,
  prescriptionController.getPrescriptionDetails
);

module.exports = router;
