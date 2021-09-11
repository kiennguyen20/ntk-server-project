const express = require("express");
const { register, login } = require("../controller/auth");
const {
  validateRegisterRequest,
  isRequestValidated,
  validateLoginRequest,
} = require("../validators/auth");
const router = express.Router();

router.post("/register", validateRegisterRequest, isRequestValidated, register);
router.post("/login", validateLoginRequest, isRequestValidated, login);
//router.post('/profile',requireLogin, (req,res) => {
//    res.status(200).json({ user: 'profile'})
//})
module.exports = router;
