const Prescription = (sequelize, DataTypes) => {
  return sequelize.define(
    "prescription",
    {
      prescription_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      is_alarm_on: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_custom: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      expiration_date: {
        type: DataTypes.DATE,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = Prescription;
