const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require('dotenv').config()

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running :D" });
});

let PORT = 8080;

require("./app/routes/tasks.routes.js")(app);
require("./app/routes/users.routes.js")(app);

app.listen(PORT, () => {
    console.log("Successfully loaded");
})