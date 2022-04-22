const Tasks = require("../models/tasks.model.js");

// Create and Save a new Task
exports.create = (req, res) => {
  const current = new Date();
  const tasks = new Tasks({
    title: req.body.title,
    description: req.body.description,
    user_id: req.body.user_id,
    creation_date: current,
    edit_date: current
  });
  tasks
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task.",
      });
    });
};

//Retrive user tasks with a user_id
exports.findForUser = (req, res) => {
  Tasks.find({ user_id: req.params.user_id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};

// Find a single tasks with a tasks_id
exports.findOne = (req, res) => {
  Tasks.findById(req.params.tasks_id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.user_id,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.user_id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving tasks with id " + req.params.user_id,
      });
    });
};

// Update a tasks identified by the tasks_id in the request
exports.update = (req, res) => {
  const current = Date();

  Tasks.findByIdAndUpdate(
    req.params.tasks_id,
    {
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id,
        edit_date: current
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.tasks_id,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.tasks_id,
        });
      }
      return res.status(500).send({
        message: "Error updating message with id " + req.params.tasks_id,
      });
    });
};

// Delete a message with the specified tasks_id in the request
exports.delete = (req, res) => {
  Tasks.findByIdAndRemove(req.params.tasks_id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.tasks_id,
        });
      }
      res.send({ message: "Tasks deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.tasks_id,
        });
      }
      return res.status(500).send({
        message: "Could not delete tasks with id " + req.params.tasks_id,
      });
    });
};
