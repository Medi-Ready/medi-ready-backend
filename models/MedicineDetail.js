const MedicineDetail = (sequelize, DataTypes) => {
  return sequelize.define(
    "medicine_detail",
    {
      medicine_id: {
        type: DataTypes.STRING(15),
        primaryKey: true,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING(30),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      efficiency: {
        type: DataTypes.TEXT,
      },
      side_effect: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = MedicineDetail;
