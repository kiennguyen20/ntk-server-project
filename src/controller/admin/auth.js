const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
exports.register = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    const { email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      email,
      hash_password,
      username: shortid.generate(),
      roles: "admin",
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "Admin created Successfully",
        });
      }
    });
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.roles === "admin") {
        const token = jwt.sign(
          { _id: user._id, roles: user.roles },
          process.env.JWT_SECRET,
          {
            expiresIn: "10h",
          }
        );
        const { _id, email, roles } = user;
        res.cookie("token", token, { expiresIn: "10h" });
        res.status(200).json({
          token,
          user: {
            _id,
            email,
            roles,
          },
        });
      } else {
        return res.status(400).json({
          message: "Tài khoản hoặc mật khẩu không hợp lệ",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logout Successfully...!",
  });
};
