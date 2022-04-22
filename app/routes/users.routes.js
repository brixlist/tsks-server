module.exports = (app) => {
    const User = require("../controllers/users.controller.js");
  
    app.post("/user", User.create);
  
    app.get("/user", User.UserLogin);
  
    app.put("/user", User.update);
  
    app.delete("/user/:user_id", User.delete);
};