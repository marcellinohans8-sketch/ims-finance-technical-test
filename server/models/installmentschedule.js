"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InstallmentSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InstallmentSchedule.init(
    {
      contractNo: DataTypes.STRING,
      installmentNo: DataTypes.INTEGER,
      monthlyInstallment: DataTypes.DECIMAL(15, 2),
      dueDate: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "InstallmentSchedule",
    },
  );
  return InstallmentSchedule;
};
