const express = require("express");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

const router = express.Router();
const {
  getCategorie,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} = require("../controllers/categorieController");

router.get(
  "/categories",
  authenticateToken,
  authorizeRole("admin"),
  getCategorie
);
router.post(
  "/create",
  authenticateToken,
  authorizeRole("admin"),
  createCategorie
);
router.put(
  "/update/:id",
  authenticateToken,
  authorizeRole("admin"),
  updateCategorie
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeRole("admin"),
  deleteCategorie
);

module.exports = router;
