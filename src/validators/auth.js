const { check, validationResult } = require("express-validator");

exports.validateRegisterRequest = [
  check("email").isEmail().withMessage("Email không hợp lệ"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password phải từ 6 - 160 ký tự"),
];
exports.validateLoginRequest = [
  check("email").isEmail().withMessage("Email không hợp lệ"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password phải từ 6 - 160 ký tự"),
];
exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
