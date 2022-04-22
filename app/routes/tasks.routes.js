module.exports = (app) => {
  const Tasks = require("../controllers/tasks.controller.js");

  app.post("/tasks", Tasks.create);

  app.get("/tasks/user/:user_id", Tasks.findForUser);

  app.get("/tasks/:tasks_id", Tasks.findOne);

  app.put("/tasks/:tasks_id", Tasks.update);

  app.delete("/tasks/:tasks_id", Tasks.delete);
};
