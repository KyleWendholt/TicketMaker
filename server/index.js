const express = require("express");
const app = express();

const ticketsController = require("./controllers/tickets");

const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
