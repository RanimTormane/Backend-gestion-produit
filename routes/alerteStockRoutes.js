const express = require("express");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

const router = express.Router();
const {
  getAlerteStock,
  createAlerteStock,
  updateAlerteStock,
  deleteAlerteStock,
} = require("../controllers/alerteStockController");

router.get(
  "/alerteStocks",
  authenticateToken,
  authorizeRole("admin"),
  getAlerteStock
);
router.post("/create", createAlerteStock);
router.put(
  "/update/:id",
  authenticateToken,
  authorizeRole("admin"),
  updateAlerteStock
);
router.delete("/delete/:id", deleteAlerteStock);

module.exports = router;
