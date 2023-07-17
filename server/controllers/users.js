const express = require("express");
const users = require("../models/users.js");
const auth = require("../models/auth.js");
const app = express.Router();

app
  .get("/", auth.authToken, (req, res, next) => {
    users
      .getUsers()
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .get("/me", (req, res, next) => {

    users
      .getUser(req.userid)
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .get("/:id", (req, res, next) => {
  
    users
      .getUser(id)
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .post("/register", (req, res, next) => {
    users
      .addUser(req.body.user)
      .then((user) => {
        if (!user) {
          res.status(400).send("User with email already exists");
        } else {
          user = user;
          const accessToken = auth.generateAccessToken(user);
          const refreshToken = auth.generateRefreshToken(user);
          const { password, ...userWithoutPassword } = user;
          res
            .status(201)
            .setHeader(
              "set-cookie",
              `refreshToken=${refreshToken}; Path=/; HttpOnly; Max-Age=${auth.refreshTokenLife}; SameSite=None; Secure`
            )
            .send({ accessToken, user: userWithoutPassword });
        }
      })
      .catch(next);
  })
  .post("/changePassword", (req, res, next) => {
  
    users
      .changePassword(auth.userid, req.body.oldPassword, req.body.newPassword)
      .then((result) => {
        if (result === true) {
          res.status(200).send("Password changed successfully");
        } else {
          res.status(400).send(result);
        }
      })
      .catch(next);
  })
  .delete("/:id", auth.authToken, (req, res, next) => {
    if (req.user.roles.includes("Admin")) {
    users.deleteUser(req.params.id).then((x) => res.status(200).send(x));
    } else {
      res.status(403).send("Not authorized");
    }
  });

module.exports = app;
