const { Medicine, MedicineDetail } = require("../models");

exports.createMany = async (medicines, prescriptionId) => {
  try {
    return await Medicine.bulkCreate(
      medicines.map(({ id }) => {
        return {
          medicine_id: id,
          fk_prescription_id: prescriptionId,
        };
      })
    );
  } catch (error) {
    throw error;
  }
};

exports.increaseFrequency = async (medicines) => {
  try {
    medicines.forEach(async (medicine) => {
      const target = await MedicineDetail.findOne({
        where: { medicine_id: medicine.id },
      });

      await target.increment("frequency", { by: 1 });
    });
  } catch (error) {
    throw error;
  }
};
