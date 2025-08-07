const express = require("express");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

const router = express.Router();
const {
  getRapport,
  createRapport,
  updateRapport,
  deleteRapport,
} = require("../controllers/rapportController");

router.get(
  "/rapports",

  getRapport
);
router.post(
  "/create",
  authenticateToken,
  authorizeRole("admin"),
  createRapport
);
router.put("/update/:id", updateRapport);
router.delete("/delete/:id", deleteRapport);

module.exports = router;
