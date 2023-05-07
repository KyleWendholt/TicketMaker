const express = require("express");
const tickets = require("../models/tickets.js");
const app = express.Router();
const {authToken} = require('../models/auth.js');

app.get("/", (req, res) => {
  tickets
    .getTickets()
    .then((x) => res.status(200).send(x))
    .catch(next);
})
.get("/:id", (req, res, next) => {
    tickets
      .getTicket(req.params.id)
      .then((x) => res.status(200).send(x))
      .catch(next);
})
.post("/", (req, res, next) => {
  const auth = authToken(req.body.JWTtoken);
  if (typeof auth === "string") {
    res.status(400).send(auth);
    return;
  }
  const ticket = {
    owner_id: auth.userid,
    creationTime: new Date(),
    title: req.body.title,
    status: req.body.status,
    content: req.body.content,
  };
  console.log(ticket);
  tickets
    .addTicket(ticket)
    .then((result) => {
      if (result.insertedId){
        res.status(201).send(result.insertedId);
      }
      else {
        res.status(400).send(result);
      }
    })
    .catch(next);
})

module.exports = app;