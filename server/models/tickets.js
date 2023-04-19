const {connect} = require('./mongo');
const {ObjectId} = require('mongodb');

async function collection() {
  const client = await connect();
  return client.db('TicketMaker').collection('exercises');
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
  await db.insertOne(ticket);
  return ticket;
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
};