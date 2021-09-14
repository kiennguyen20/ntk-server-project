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
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
router.post("/user/getCartItems", requireLogin, userMiddleware, getCartItems);
//new update
router.post("/user/cart/removeItem", userMiddleware, removeCartItems);
module.exports = router;
