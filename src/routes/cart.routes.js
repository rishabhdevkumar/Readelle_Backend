const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const {auth} = require("../middlewares/auth.middleware");

router.get("/",auth,cartController.getCart);
router.post("/",auth,cartController.addToCart);
router.put("/:cartItemId",auth,cartController.updateCartItem);
router.delete("/:cartItemId",auth,cartController.removeCartItem);

module.exports = router;
