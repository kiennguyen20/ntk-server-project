const jwt = require("jsonwebtoken");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
exports.upload = multer({ storage });

exports.requireLogin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authentication required" });
  }
  next();

  //jwt.decode()
};
exports.userMiddleware = (req, res, next) => {
  if (req.user.roles !== "user") {
    return res.status(400).json({ message: "User access dinied" });
  }
  next();
};
exports.adminMiddleware = (req, res, next) => {
  if (req.user.roles !== "admin") {
    return res.status(400).json({ message: "Admin access dinied" });
  }
  next();
};
