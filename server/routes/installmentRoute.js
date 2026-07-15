const router = require("express").Router();
const InstallmentController = require("../controllers/installmentController");

router.get("/test", (req, res) => {
  res.json({
    message: "Route OK",
  });
});

router.post("/calculate", InstallmentController.calculate);

router.get("/overdue", InstallmentController.getTotalOverdue);

router.get("/penalty", InstallmentController.getPenalty);

module.exports = router;
