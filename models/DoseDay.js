const DoseDay = (sequelize, DataTypes) => {
  return sequelize.define(
    "dose_day",
    {
      dose_day_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      mon: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      tue: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      wed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      thr: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      fri: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sat: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sun: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = DoseDay;
