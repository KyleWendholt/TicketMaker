const express = require("express");
const app = express.Router();
const auth = require("../models/auth.js");


app.post("/", (req, res, next) => {
  auth
    .login(req.body.username, req.body.password)
      .then(x => {
        if (typeof x === "string") {
          res.status(401).send(x);
          return;
        }
        const token = x.token;
        res.cookie("JWTtoken", token).sendStatus(200)
        console.log("cookie set");
      })
    .catch(next);
})

module.exports = app;