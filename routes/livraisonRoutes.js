const express = require("express");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

const router = express.Router();
const {
  getLivraison,
  createLivraison,
  updateLivraison,
  deleteLivraison,
} = require("../controllers/livraisonController");

router.get(
  "/Livraisons",
  authenticateToken,
  authorizeRole("admin"),
  getLivraison
);
router.post("/create", createLivraison);
router.put("/update/:id", updateLivraison);
router.delete("/delete/:id", deleteLivraison);

module.exports = router;
