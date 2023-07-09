const {connect} = require('./mongo');
const {ObjectId} = require('mongodb');
const {login, authToken} = require('./auth.js');
const bcrypt = require("bcryptjs");

async function collection() {
  const client = await connect();
  return client.db('TicketMaker').collection('users');
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

async function updateUser(id, user) {
  const db = await collection();
  const result = await db.updateOne({_id: new ObjectId(id)}, {$set: user});
  return result.modifiedCount === 1 ? true : "No users updated";
}

async function changePassword(userid, oldPassword, newPassword) {
  const user = await getUser(userid);
  
  if (!user) {
    return "User not found";
  }
  if (!(await bcrypt.compare(oldPassword, user.password))) {
    return "Old password is incorrect";
  }
  user.password = await bcrypt.hash(newPassword, 10);

  return await updateUser(user._id,user);
}

async function deleteUser(id) {
  const db = await collection();
  const result = await db.deleteOne({_id: new ObjectId(id)});
  return result.deletedCount === 1;
}
  
async function addUser(user) {
  const db = await collection();
  user.password = await bcrypt.hash(user.password, 10);
  if (await db.findOne({username: user.username})) {
    return false;
  }
  const result = await db.insertOne(user);
  return result;
}



module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  changePassword,
};