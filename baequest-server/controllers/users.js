const user = require("../models/user");
const STATUS = require("../utils/errors");
const bcrypt = require("bcryptjs");
const SECRET = require("../utils/config");


module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.status(STATUS.OK).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      user.create({ name, avatar, email, password: hash });
    })
    .then((newUser) => res.status(STATUS.CREATED).send(newUser))
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        return res.status(STATUS.EXISTING_EMAIL_ERROR).send({
          message: "A user with this email already exists",
        });
      }
      if (err.name === "ValidationError") {
        return res.status(STATUS.BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.getSpecificUser = (req, res) => {
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

  return user.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, SECRET.JWT_SECRET, { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
}