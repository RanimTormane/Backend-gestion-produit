const express = require("express");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

const router = express.Router();
const {
  getLigneCommande,
  createLigneCommande,
  updateLigneCommande,
  deleteLigneCommande,
} = require("../controllers/ligneCommandeController");

router.get(
  "/ligneCommandes",

  getLigneCommande
);
router.post("/create", createLigneCommande);
router.put("/update/:id", updateLigneCommande);
router.delete("/delete/:id", deleteLigneCommande);

module.exports = router;
