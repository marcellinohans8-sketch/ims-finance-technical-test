const { sequelize } = require("../models");

class InstallmentController {
  static async calculate(req, res) {
    try {
      const { contractNo, clientName, otr, dpPercent, tenor } = req.body;

      const downPayment = (otr * dpPercent) / 100;
      const loanAmount = otr - downPayment;
      const monthlyInstallment = loanAmount / tenor;

      const schedule = [];

      let dueDate = new Date("2024-01-25");

      for (let i = 1; i <= tenor; i++) {
        schedule.push({
          installmentNo: i,
          monthlyInstallment,
          dueDate: dueDate.toISOString().split("T")[0],
        });

        dueDate.setMonth(dueDate.getMonth() + 1);
      }

      res.status(200).json({
        contractNo,
        clientName,
        otr,
        downPayment,
        loanAmount,
        monthlyInstallment,
        schedule,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async getTotalOverdue(req, res) {
    try {
      const [result] = await sequelize.query(`
      SELECT
        c."contractNo" AS "contractNo",
        c."clientName" AS "clientName",
        SUM(i."monthlyInstallment") AS "totalOverdue"
      FROM "Contracts" c
      JOIN "InstallmentSchedules" i
        ON c."contractNo" = i."contractNo"
      WHERE i."dueDate" <= '2024-08-14'
      GROUP BY c."contractNo", c."clientName";
    `);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async getPenalty(req, res) {
    try {
      const [result] = await sequelize.query(`
      SELECT
        c."contractNo" AS "contractNo",
        c."clientName" AS "clientName",
        i."installmentNo" AS "installmentNo",
        (DATE '2024-08-14' - i."dueDate") AS "lateDays",
        ROUND(
          i."monthlyInstallment" * 0.001 * (DATE '2024-08-14' - i."dueDate"),
          2
        ) AS "totalPenalty"
      FROM "Contracts" c
      JOIN "InstallmentSchedules" i
        ON c."contractNo" = i."contractNo"
      WHERE
        i."installmentNo" > 5
        AND i."dueDate" < DATE '2024-08-14'
      ORDER BY i."installmentNo";
    `);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = InstallmentController;
