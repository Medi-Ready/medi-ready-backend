const sequelize = require("sequelize");
const { MedicineDetail } = require("../../models");

const Op = sequelize.Op;

exports.getMedicineDetails = async (req, res, next) => {
  const { name } = req.body;

  const medicine = await MedicineDetail.findOne({
    where: {
      name: {
        [Op.like]: "%" + name + "%",
      },
    },
  });

  if (!medicine) {
    return res.json({ result: "fail", data: null });
  }

  res.json({ result: "success", data: medicine });
};

exports.getMedicineNames = async (req, res, next) => {
  const { keyword } = req.body;

  const medicine = await MedicineDetail.findAll({
    where: {
      name: {
        [Op.like]: "%" + keyword + "%",
      },
    },
  });

  if (!medicine) {
    return res.json({ result: "fail", data: null });
  }

  res.json({ result: "success", data: medicine });
};
