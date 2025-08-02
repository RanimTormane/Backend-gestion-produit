const express = require("express");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get(
  "/users",
  authenticateToken,
  authorizeRole("client", "admin"),
  getUsers
);
router.post("/register", createUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
