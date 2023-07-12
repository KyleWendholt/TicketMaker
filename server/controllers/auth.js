const express = require("express");
const app = express.Router();
const auth = require("../models/auth.js");
const users = require("../models/users.js");


app.post("/login", (req, res, next) => {
  auth
    .authenticateUser(req.body.username, req.body.password)
      .then(user => {
        if (!user) {
          res.status(401).send("Invalid username or password");
          return;
        }
        console.log(user);
        const accessToken = auth.generateAccessToken(user);
        const refreshToken = auth.generateRefreshToken(user);
        res.status(200).setHeader('set-cookie', `refreshToken=${refreshToken}; Path=/; HttpOnly; Max-Age=${auth.refreshTokenLife}; SameSite=None; Secure`)
        .send({ accessToken });
      })
    .catch(next);
})
.post("/refresh",auth.authRefreshToken, (req, res, next) => {
  const accessToken = auth.generateAccessToken(req.user);
  res.status(200).send({ accessToken });
})
.post("/logout", (req, res, next) => {
  res.status(200).setHeader('set-cookie', `refreshToken=; Path=/; HttpOnly; Max-Age=0; SameSite=None; Secure`)
  .send();
})

module.exports = app;