const express = require("express");
require("dotenv").config();

const sequelize = require("./config/db");
const User = require("./models/users");

const PORT = process.env.PORT || 3030;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 3030;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
