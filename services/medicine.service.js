const { Medicine } = require("../models");
const { parse } = require("../utils/parseJson");

exports.createMany = async (medicines, prescriptionId) => {
  const medicineList = parse(medicines);

  return await Medicine.bulkCreate(
    medicineList.map((medicineId) => {
      return { medicine_id: medicineId, fk_prescription_id: prescriptionId };
    })
  );
};
