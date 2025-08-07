const express = require("express");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
} = require("../controllers/userController");

router.get("/users", authenticateToken, authorizeRole("admin"), getUsers);
router.post("/create", authenticateToken, authorizeRole("admin"), createUser);
router.post("/register", registerUser);
router.put(
  "/update/:id",
  authenticateToken,
  authorizeRole("admin"),
  updateUser
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeRole("admin"),
  deleteUser
);

module.exports = router;
