const { Medicine } = require("../models");

exports.createMany = async (medicines, prescriptionId) => {
  return await Medicine.bulkCreate(
    medicines.map((medicineId) => {
      return { medicine_id: medicineId, fk_prescription_id: prescriptionId };
    })
  );
};
