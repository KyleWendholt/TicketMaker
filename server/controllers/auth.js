const express = require("express");
const app = express.Router();
const auth = require("../models/auth.js");


app.post("/", (req, res, next) => {
  auth
    .login(req.body.username, req.body.password)
    .then(token => res.cookie("JWTtoken", token).sendStatus(200))
    .catch(next);
})

module.exports = app;