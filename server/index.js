const express = require("express");
const app = express();

const ticketsController = require("./controllers/tickets");
const usersController = require("./controllers/users");
const authController = require("./controllers/auth");

const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", express.static("./client/dist"));

app.use(express.json());

app.use("/api/v1/tickets", ticketsController).use("/api/v1/users", usersController).use("/api/v1/auth", authController);

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
