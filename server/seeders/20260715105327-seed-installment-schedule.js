"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "InstallmentSchedules",
      [
        {
          contractNo: "AGR00001",
          installmentNo: 1,
          monthlyInstallment: 12907000,
          dueDate: "2024-01-25",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          contractNo: "AGR00001",
          installmentNo: 2,
          monthlyInstallment: 12907000,
          dueDate: "2024-02-25",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          contractNo: "AGR00001",
          installmentNo: 3,
          monthlyInstallment: 12907000,
          dueDate: "2024-03-25",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          contractNo: "AGR00001",
          installmentNo: 4,
          monthlyInstallment: 12907000,
          dueDate: "2024-04-25",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          contractNo: "AGR00001",
          installmentNo: 5,
          monthlyInstallment: 12907000,
          dueDate: "2024-05-25",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          contractNo: "AGR00001",
          installmentNo: 6,
          monthlyInstallment: 12907000,
          dueDate: "2024-06-25",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          contractNo: "AGR00001",
          installmentNo: 7,
          monthlyInstallment: 12907000,
          dueDate: "2024-07-25",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          contractNo: "AGR00001",
          installmentNo: 8,
          monthlyInstallment: 12907000,
          dueDate: "2024-08-25",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          contractNo: "AGR00001",
          installmentNo: 9,
          monthlyInstallment: 12907000,
          dueDate: "2024-09-25",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          contractNo: "AGR00001",
          installmentNo: 10,
          monthlyInstallment: 12907000,
          dueDate: "2024-10-25",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          contractNo: "AGR00001",
          installmentNo: 11,
          monthlyInstallment: 12907000,
          dueDate: "2024-11-25",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          contractNo: "AGR00001",
          installmentNo: 12,
          monthlyInstallment: 12907000,
          dueDate: "2024-12-25",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("InstallmentSchedules", null, {});
  },
};
