const WaitingList = (sequelize, DataTypes) => {
  return sequelize.define(
    "waitingList",
    {
      waiting_list_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = WaitingList;
