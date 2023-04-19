const {connect} = require('./mongo');
const {ObjectId} = require('mongodb');

async function collection() {
  const client = await connect();
  return client.db('TicketMaker').collection('tickets');
}

async function getUsers() {
  const db = await collection();
  const data = await db.find().toArray();
  return {total: data.length, list: data};
}

async function getUser(id) {
  const db = await collection();
  const data = await db.findOne({_id: new ObjectId(id)});
  return data;
}

async function addUser(user) {
  const db = await collection();
  await db.insertOne(user);
  return user;
}

async function updateUser(id, user) {
  const db = await collection();
  await db.updateOne({_id: new ObjectId(id)}, {$set: user});
  return user;
}

async function deleteUser(id) {
  const db = await collection();
  const result = await db.deleteOne({_id: new ObjectId(id)});
  return result.deletedCount === 1;
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};