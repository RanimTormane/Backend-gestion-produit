const express = require("express");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

const router = express.Router();
const {
  getCommande,
  createCommande,
  updateCommande,
  deleteCommande,
} = require("../controllers/commandeController");

router.get(
  "/commandes",
  authenticateToken,
  authorizeRole("admin"),
  getCommande
);
router.post("/create", createCommande);
router.put("/update/:id", updateCommande);
router.delete("/delete/:id", deleteCommande);

module.exports = router;
