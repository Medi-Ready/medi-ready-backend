const sequelize = require("sequelize");
const { MedicineDetail } = require("../../models");

const Op = sequelize.Op;

exports.getMedicineDetails = async (req, res, next) => {
  const { name } = req.body;

  try {
    const medicine = await MedicineDetail.findOne({
      where: {
        itemName: {
          [Op.like]: "%" + name + "%",
        },
      },
    });

    if (!medicine) {
      return res.json({ result: "fail", data: null });
    }

    res.json({ result: "success", data: medicine });
  } catch (error) {
    res.json({ result: "fail" });
  }
};

exports.getMedicineNames = async (req, res, next) => {
  const { search } = req.query;

  try {
    const medicines = await MedicineDetail.findAll({
      where: {
        itemName: {
          [Op.like]: "%" + search.trim() + "%",
        },
      },
      order: [["frequency", "DESC"]],
    });

    if (!medicines) {
      return res.json({ result: "fail", data: null });
    }

    res.json({ result: "success", data: medicines.slice(0, 10) });
  } catch (error) {
    res.json({ result: "fail" });
  }
};
