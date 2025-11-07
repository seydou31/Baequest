const jwt = require("jsonwebtoken");
const user = require("../models/user");
const STATUS = require("../utils/errors");
const bcrypt = require("bcryptjs");
const SECRET = require("../utils/config");

module.exports.createUser = async (req, res) => {
  const { name, avatar, email, password } = req.body;

  try {
    // Pre-check to give a fast 409 if email already exists
    const existing = await user.findOne({ email });
    if (existing) {
      return res
        .status(STATUS.EXISTING_EMAIL_ERROR)
        .send({ message: "A user with this email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await user.create({ name, avatar, email, password: hash });
    const userObject = newUser.toObject();
    delete userObject.password;
    return res.status(STATUS.CREATED).send(userObject);
  } catch (err) {
    console.error(err);
    // If a race occurred and Mongo reports duplicate key, return 409
    if (err && err.code === 11000) {
      return res
        .status(STATUS.EXISTING_EMAIL_ERROR)
        .send({ message: "A user with this email already exists" });
    }
    if (err && err.name === "ValidationError") {
      return res.status(STATUS.BAD_REQUEST).send({ message: err.message });
    }
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .send({ message: "An error has occurred on the server" });
  }
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  user
    .findById(userId)
    .orFail(new Error("User not found"))
    .then((newUser) => res.status(STATUS.OK).send(newUser))
    .catch((err) => {
      console.error(err);
      if (err && err.name === "CastError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Invalid user id" });
      }
      if (
        err &&
        (err.message === "User not found" ||
          err.name === "DocumentNotFoundError")
      ) {
        return res.status(STATUS.NOT_FOUND).send({ message: "User not found" });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return user
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET.JWT_SECRET, {
        expiresIn: "7d",
      });
      res
        .cookie("jwt", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          secure: true,
          sameSite: "None",
        })
        .json({
          message: "Login successful",
          user: {
            _id: user._id,
            email: user.email,
          },
        });
    })
    .catch((err) => {
      res.status(STATUS.UNAUTHORIZED).send({ message: err.message });
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  return res.status(200).json({ message: "Logout successful" });
};