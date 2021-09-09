const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.js"))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require("./User")(sequelize, Sequelize);
db.Alarm = require("./Alarm")(sequelize, Sequelize);
db.Patient = require("./Patient")(sequelize, Sequelize);
db.DoseDay = require("./DoseDay")(sequelize, Sequelize);
db.Medicine = require("./Medicine")(sequelize, Sequelize);
db.Pharmacist = require("./Pharmacist")(sequelize, Sequelize);
db.WaitingList = require("./WaitingList")(sequelize, Sequelize);
db.DoseHistory = require("./DoseHistory")(sequelize, Sequelize);
db.Prescription = require("./Prescription")(sequelize, Sequelize);
db.MedicineDetail = require("./MedicineDetail")(sequelize, Sequelize);

db.User.hasOne(db.Patient, { foreignKey: "fk_user_id" });
db.Patient.belongsTo(db.User, { foreignKey: "fk_user_id" });

db.User.hasOne(db.Pharmacist, { foreignKey: "fk_user_id" });
db.Pharmacist.belongsTo(db.User, { foreignKey: "fk_user_id" });

db.Patient.hasOne(db.Alarm, { foreignKey: "fk_patient_id" });
db.Alarm.belongsTo(db.Patient, { foreignKey: "fk_patient_id" });

db.Patient.hasMany(db.DoseHistory, { foreignKey: "fk_patient_id" });
db.DoseHistory.belongsTo(db.Patient, { foreignKey: "fk_patient_id" });

db.Patient.hasMany(db.Prescription, { foreignKey: "fk_patient_id" });
db.Prescription.belongsTo(db.Patient, { foreignKey: "fk_patient_id" });

db.MedicineDetail.hasMany(db.Medicine, { foreignKey: "medicine_id" });
db.Medicine.belongsTo(db.MedicineDetail, { foreignKey: "medicine_id" });

db.WaitingList.hasMany(db.Patient, { foreignKey: "fk_waiting_list_id" });
db.Patient.belongsTo(db.WaitingList, { foreignKey: "fk_waiting_list_id" });

db.Pharmacist.hasMany(db.Prescription, { foreignKey: "fk_pharmacist_id" });
db.Prescription.belongsTo(db.Pharmacist, { foreignKey: "fk_pharmacist_id" });

db.Prescription.hasMany(db.Medicine, { foreignKey: "fk_prescription_id" });
db.Medicine.belongsTo(db.Prescription, { foreignKey: "fk_prescription_id" });

db.Prescription.hasMany(db.DoseDay, { foreignKey: "fk_prescription_id" });
db.DoseDay.belongsTo(db.Prescription, { foreignKey: "fk_prescription_id" });

db.Pharmacist.hasOne(db.WaitingList, { foreignKey: "fk_pharmacist_id" });
db.WaitingList.belongsTo(db.Pharmacist, { foreignKey: "fk_pharmacist_id" });

db.Prescription.hasMany(db.DoseHistory, { foreignKey: "fk_prescription_id" });
db.DoseHistory.belongsTo(db.Prescription, { foreignKey: "fk_prescription_id" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
