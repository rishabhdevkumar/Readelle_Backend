const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {auth} = require("../middlewares/auth.middleware");

router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);
router.get("/me",auth,userController.getMe);

module.exports = router;
