const profile = require("../models/profile");
const STATUS = require("../utils/errors");
module.exports.createProfile = (req, res) => {
  const { name, age, gender, bio, interests, convoStarter } = req.body;
  profile
    .create({
      name,
      age,
      gender,
      bio,
      interests,
      convoStarter,
      owner: req.user._id,
    })
    .then((profile) => res.status(STATUS.CREATED).send(profile))
    .catch((err) => {
      console.error(err);
      // Handle Mongoose validation errors -> client sent bad data
      if (err && err.name === "ValidationError") {
        const errors = Object.values(err.errors || {}).map((e) => e.message);
        const combinedMessage = errors.join(". ");
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Validation error", combinedMessage });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.getProfile = (req, res) => {
  return profile
    .findOne({ owner: req.user._id })
    .orFail(new Error("profile not found"))
    .then((profile) => {
      console.log("Profile found:", profile);
      res.status(STATUS.OK).send(profile);
    })
    .catch((err) => {
      if (
        err &&
        (err.message === "profile not found" ||
          err.name === "DocumentNotFoundError")
      ) {
        return res
          .status(STATUS.NOT_FOUND)
          .send({ message: "profile not found" });
      }

      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, age, gender, bio, interests, convoStarter } = req.body;
  return profile
    .findOneAndUpdate(
      { owner: req.user._id },
      { name, age, gender, bio, interests, convoStarter },
      {
        new: true,
        runValidators: true,  
      }
    )
    .orFail(new Error("Profile not found"))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(STATUS.BAD_REQUEST).send({ message: err.message });
      } else if (err.message === "User not found") {
        res.status(STATUS.NOT_FOUND).send({ message: err.message });
      } else {
        res.status(STATUS.INTERNAL_SERVER_ERROR).send({ message: err.message });
      }
    });
};
