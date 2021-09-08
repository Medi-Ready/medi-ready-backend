const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const prescriptionController = require("./controllers/prescription.controller");

router.get("/", verifyToken, prescriptionController.getPrescriptions);

module.exports = router;
