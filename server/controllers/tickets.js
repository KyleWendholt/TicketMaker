const express = require("express");
const tickets = require("../models/tickets.js");
const app = express.Router();
const { authToken } = require("../models/auth.js");

app
  .get("/", authToken, (req, res, next) => {
    console.log("headers are " + req.headers);
    tickets
      .getTickets()
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .get("/open", authToken, (req, res, next) => {
    tickets
      .getOpenTickets()
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .get("/problem", authToken, (req, res, next) => {
    tickets
      .getProblemTickets()
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .get("/mine", authToken, (req, res, next) => {
    if (auth === "string") {
      res.status(401).send();
      return;
    }
    tickets
      .getTicketsByOwner(req.user.userid)
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .get("/:id", (req, res, next) => {
    const auth = authToken(req.header.Authorization);
    if (auth === "string") {
      res.status(401).send();
      return;
    }
    tickets
      .getTicket(req.params.id)
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .post("/", (req, res, next) => {
    const auth = authToken(req.header.Authorization);
    if (auth === "string") {
      res.status(401).send();
      return;
    }
    const ticket = {
      owner_id: auth.userid,
      timestamp: new Date(),
      title: req.body.title,
      status: req.body.status,
      content: req.body.content,
      responsibility: req.body.responsibility,
    };
    console.log("ticket is " + ticket);
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
  .post("/update/:id", (req, res, next) => {
    const auth = authToken(req.header.Authorization);
    if (auth === "string") {
      res.status(401).send();
      return;
    }
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
