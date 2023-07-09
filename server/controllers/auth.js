const express = require("express");
const app = express.Router();
const auth = require("../models/auth.js");


app.post("/login", (req, res, next) => {
  auth
    .authenticateUser(req.body.username, req.body.password)
      .then(user => {
        if (!user) {
          res.status(401).send("Invalid username or password");
          return;
        }
        const accessToken = auth.generateAccessToken(user);
        const refreshToken = auth.generateRefreshToken(user);
        res.status(200).setHeader('set-cookie', `refreshToken=${refreshToken}; Path=/; HttpOnly; Max-Age=${auth.refreshTokenLife}; SameSite=None; Secure`)
        .send({ accessToken });
      })
    .catch(next);
})

module.exports = app;