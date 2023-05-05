const express = require("express");
const users = require("../models/users.js");
const app = express.Router();

app.post("/login", (req,res,next)=>{
  users
    .login(req.body.username, req.body.password)
    .then((x) => res.status(200).send(x))
    .catch(next);
})
.post("/register", (req,res,next)=>{
  users
    .addUser(req.body)
    .then((x) => res.status(200).send(x))
    .catch(next);
})
.post('/changePassword', (req,res,next)=>{
  users
    .changePassword(req.body.JWTtoken, req.body.oldPassword, req.body.newPassword)
    .then((result) => {
      if (result === true) {
        res.status(200).send("Password changed successfully");
      } else {
        res.status(400).send(result);
      }
    }
    )
    .catch(next);
})

module.exports = app;
