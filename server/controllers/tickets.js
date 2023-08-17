const express = require("express");
const tickets = require("../models/tickets.js");
const app = express.Router();
const { authToken } = require("../models/auth.js");

app
  .get("/", authToken, (req, res, next) => {
    tickets
      .getTickets()
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .get("/responsibility", authToken, (req, res, next) => {
    tickets
      .getTicketsByResponsibility(req.user.roles)
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .get("/open", authToken, (req, res, next) => {
    tickets
      .getOpenTickets()
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .get("/problems", authToken, (req, res, next) => {
    tickets
      .getProblemTickets()
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .get("/mine", authToken, (req, res, next) => {
    tickets
      .getTicketsByOwner(req.user.userid)
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .get("/:id",authToken, (req, res, next) => {
    tickets
      .getTicket(req.params.id)
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .post("/", authToken, (req, res, next) => {
    const ticket = req.body.ticket;
    console.log(ticket);
    tickets
      .addTicket(ticket)
      .then((result) => {
        if (result.insertedId) {
          res.status(201).send(result.insertedId);
        } else {
          res.status(400).send(result);
        }
      })
      .catch(next);
  })
  .post("/update/:id",authToken, (req, res, next) => {
    tickets
      .updateTicket(req.body._id, req.body.updates)
      .then((result) => {
        if (result === true) {
          res.status(200).send("Ticket updated successfully");
        } else {
          res.status(400).send(result);
        }
      })
      .catch(next);
  });

module.exports = app;
