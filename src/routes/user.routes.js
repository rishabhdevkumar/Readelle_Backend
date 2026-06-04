const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { auth, authorizeRole } = require("../middlewares/auth.middleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getMe);

router.get("/", auth, authorizeRole(["admin"]), userController.getAllUsers);
router.put("/:userId", auth, authorizeRole(["admin"]), userController.updateUser);
router.delete("/:userId", auth, authorizeRole(["admin"]), userController.deleteUser);

module.exports = router;
