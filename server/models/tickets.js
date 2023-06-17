const {connect} = require('./mongo');
const {ObjectId} = require('mongodb');

async function collection() {
  const client = await connect();
  return client.db('TicketMaker').collection('tickets');
}

async function getTickets() {
  const db = await collection();
  const data = await db.find().toArray();
  return {total: data.length, list: data};
}

async function getTicket(id) {
  const db = await collection();
  const data = await db.findOne({_id: new ObjectId(id)});
  return data;
}

async function addTicket(ticket) {
  const db = await collection();
  const result = await db.insertOne(ticket);
  console.log(result);
  return result;
}

async function getOpenTickets() {
  const db = await collection();
  const data = await db.find({status: "open"}).toArray();
  return {total: data.length, list: data};
}

async function getProblemTickets() {
  const db = await collection();
  const data = await db.find({status: "problem"}).toArray();
  return {total: data.length, list: data};
}

async function getTicketsByOwner(owner_id) {
  const db = await collection();
  const data = await db.find({owner_id: owner_id}).toArray();
  return {total: data.length, list: data};
}

async function updateTicket(id, ticket) {
  const db = await collection();
  await db.updateOne({_id: new ObjectId(id)}, {$set: ticket});
  return ticket;
}

async function deleteTicket(id) {
  const db = await collection();
  const result = await db.deleteOne({_id: new ObjectId(id)});
  return result.deletedCount === 1;
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