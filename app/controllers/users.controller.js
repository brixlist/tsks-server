const User = require("../models/users.model.js");

// Create and Save a new Users
exports.create = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then((data) => {
      //console.log(data);
      res.send({ email: data.email, user_id: data._id });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

//Login functions
exports.UserLogin = (req, res) => {
  User.find({ email: req.body.email, password: req.body.password })
    .then((data) => {
      //console.log(data);
      if (data.length == 0) {
        return res.status(404).send({
          message: "Username or Password is wrong",
        });
      }
      res.send({ email: data[0].email, user_id: data[0]._id });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};

// Update a user identified by the user_id in the request
exports.update = (req, res) => {
  User.findByIdAndUpdate(
    req.params.user_id,
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "User not found with id " + req.params.user_id,
        });
      }
      res.send({ email: data[0].email, user_id: data[0]._id });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.user_id,
        });
      }
      return res.status(500).send({
        message: "Error updating message with id " + req.params.user_id,
      });
    });
};

// Delete a user with the specified user_id in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.user_id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "User not found with id " + req.params.user_id,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.user_id,
        });
      }
      return res.status(500).send({
        message: "Could not delete User with id " + req.params.user_id,
      });
    });
};
