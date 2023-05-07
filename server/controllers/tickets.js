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

module.exports = app;