const express = require("express");
const { requireLogin } = require("../../common-middleware");
const { register, login, logout } = require("../../controller/admin/auth");
const {
  validateRegisterRequest,
  isRequestValidated,
  validateLoginRequest,
} = require("../../validators/auth");
const router = express.Router();

router.post(
  "/admin/register",
  validateRegisterRequest,
  isRequestValidated,
  register
);
router.post("/admin/login", validateLoginRequest, isRequestValidated, login);
router.post("/admin/logout", logout);
module.exports = router;
