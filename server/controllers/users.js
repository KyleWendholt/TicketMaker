const express = require("express");
const users = require("../models/users.js");
const { authToken } = require("../models/auth.js");
const app = express.Router();

app
.get("/", (req,res,next)=>{
  const auth = authToken(req.body.JWTtoken);
  if (typeof auth === 'string') {
    res.status(401).send(auth);
    return;
  }
  users
    .getUsers()
    .then((x) => res.status(200).send(x))
    .catch(next);
})
.get("/me", (req,res,next)=>{
  const auth = authToken(req.body.JWTtoken);
  if (typeof auth === "string") {
    res.status(401).send(auth);
    return;
  }
  users
    .getUser(auth.userid)
    .then((x) => res.status(200).send(x))
    .catch(next);
})
.get("/:id", (req,res,next)=>{
  const auth = authToken(req.body.JWTtoken);
  if (typeof auth === "string") {
    res.status(401).send(auth);
    return;
  }
  users
    .getUser(id)
    .then((x) => res.status(200).send(x))
    .catch(next);
})
.post("/register", (req,res,next)=>{
  users
    .addUser(req.body)
    .then((result) => {
      if(result){
        res.status(201).send(result.insertedId);
      }
      else{
        res.status(400).send("User already exists");
      }
    })
    .catch(next);
})
.post('/changePassword', (req,res,next)=>{
  const auth = authToken(req.body.JWTtoken);
  if (typeof auth === 'string') {
    res.status(401).send(auth);
    return;
  }
  users
    .changePassword(auth.userid, req.body.oldPassword, req.body.newPassword)
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
