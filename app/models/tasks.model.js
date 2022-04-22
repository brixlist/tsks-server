const mongoose = require("mongoose");

const TasksSchema = mongoose.Schema({
  title: String,
  description: String,
  creation_date: Date,
  completed: Boolean,
  user_id: String
});

module.exports = mongoose.model("Tasks", TasksSchema);