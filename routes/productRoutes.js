const express = require("express");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/produiController");

router.get(
  "/products",

  getProducts
);
router.post(
  "/create",
  authenticateToken,
  authorizeRole("fournisseur"),
  createProduct
);
router.put(
  "/update/:id",
  authenticateToken,
  authorizeRole("fournisseur"),
  updateProduct
);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
