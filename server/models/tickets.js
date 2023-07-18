const { time } = require("console");
const { connect } = require("./mongo");
const { ObjectId } = require("mongodb");

async function collection() {
  const client = await connect();
  return client.db("TicketMaker").collection("tickets");
}

async function getTickets() {
  const db = await collection();
  let data = await db.find().toArray();
  data = newToOld(data);
  return { total: data.length, list: data };
}

async function getTicket(id) {
  const db = await collection();
  const data = await db.findOne({ _id: new ObjectId(id) });
  return data;
}

async function addTicket(ticket) {
  ticket._id = new ObjectId();
  const db = await collection();
  const result = await db.insertOne(ticket);
  return result;
}

async function getOpenTickets() {
  const db = await collection();
  let data = await db.find({ status: "Open" }).toArray();
  data = newToOld(data);
  return { total: data.length, list: data };
}

async function getProblemTickets() {
  const db = await collection();
  const data = await db.find({ status: "Problem" }).toArray();
  return { total: data.length, list: data };
}

async function getTicketsByOwner(owner_id) {
  const db = await collection();
  let data = await db.find({ owner_id: owner_id }).toArray();
  data = newToOld(data);
  return { total: data.length, list: data };
}

async function updateTicket(id, ticket) {
  const db = await collection();
  await db.updateOne({ _id: new ObjectId(id) }, { $set: ticket });
  return ticket;
}

async function deleteTicket(id) {
  const db = await collection();
  const result = await db.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

function newToOld(data) {
  data = data.sort((a, b) => {
    const result = new Date(b.timestamp) - new Date(a.timestamp);
    return result;
  });
  return data;
}

module.exports = {
  getTickets,
  getTicket,
  addTicket,
  updateTicket,
  deleteTicket,
  getTicketsByOwner,
  getOpenTickets,
  getProblemTickets,
};
