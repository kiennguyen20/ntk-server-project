const express = require("express");
const {
  addItemToCart,
  getCartItems,
  addToCart,
  removeCartItems,
} = require("../controller/cart");

const {
  requireLogin,

  userMiddleware,
} = require("../common-middleware");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  requireLogin,
  userMiddleware,
  addItemToCart
);
router.post("/user/getCartItems", requireLogin, userMiddleware, getCartItems);
router.post(
  "/user/cart/removeItem",
  requireLogin,
  userMiddleware,
  removeCartItems
);
module.exports = router;
