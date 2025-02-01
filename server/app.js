const express = require("express");
require("dotenv").config();

const sequelize = require("./config/db");

const {
  UnitsRoutes,
  RolesRoutes,
  employeesRoutes,
  usersRoutes,
} = require("./routes");
const { errorHandling, unsupportedRoutes } = require("./middlewares");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/v1/units", UnitsRoutes);
app.use("/api/v1/roles", RolesRoutes);
app.use("/api/v1/employees", employeesRoutes);
app.use("/api/v1/users", usersRoutes);

app.use(unsupportedRoutes);

app.use(errorHandling);

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
