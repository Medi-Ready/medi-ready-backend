const userService = require("../../services/user.service");
const prescriptionService = require("../../services/prescription.service");
const { Prescription, Medicine, DoseHistory, Patient } = require("../../models");

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

exports.postPrescription = async (req, res, next) => {
  const { medicines, duration, patient_id } = req.body;

  const DAY = 86400000;

  const pharmacist = await userService.findPharmacist(req.userInfo);
  const pharmacistId = pharmacist["pharmacist.pharmacist_id"];

  const now = new Date().getTime();
  const expirationDate = new Date().getTime() + duration * DAY;

  const prescription = await Prescription.create({
    is_alarm_on: true,
    expiration_date: expirationDate,
    fk_patient_id: patient_id,
    fk_pharmacist_id: pharmacistId,
  });

  const prescriptionId = prescription.dataValues.prescription_id;

  const medicineList = medicines
    .slice(1, -1)
    .split(", ")
    .map((item) => item.slice(1, -1));

  await Medicine.bulkCreate(
    medicineList.map((medicineId) => {
      return { medicine_id: medicineId, fk_prescription_id: prescriptionId };
    })
  );

  let count = 0;

  while (now + count * DAY <= expirationDate) {
    await DoseHistory.create({
      fk_prescription_id: prescriptionId,
      fk_patient_id: patient_id,
      date: now + count * DAY,
    });

    count += 1;
  }

  await Patient.update({ fk_queue_id: null }, { where: { patient_id } });

  res.json({ result: "success" });
};
