const express = require("express");
const app = express.Router();
const auth = require("../models/auth.js");


app.post("/", (req, res, next) => {
  auth
    .login(req.body.username, req.body.password)
    .then((x) => res.status(200).send(x))
    .catch(next);
})

module.exports = app;