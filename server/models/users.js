const {connect} = require('./mongo');
const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET ?? "";

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
  await db.updateOne({_id: new ObjectId(id)}, {$set: user});
  return user;
}

async function changePassword(token, newPassword) {
  const db = await collection();
  const userid = jwt.verify(token, JWT_SECRET).id;
  const user = await db.findOne({_id: new ObjectId(userid)});
  if (!user) {
    return null;
  }
  return updateUser(token.id, {password: await bcrypt.hash(newPassword, 10)});
}



async function deleteUser(id) {
  const db = await collection();
  const result = await db.deleteOne({_id: new ObjectId(id)});
  return result.deletedCount === 1;
}


async function login(username, password) {
  const db = await collection();
  const user = await db.findOne({username: username});
  if (!user) {
    return null;
  }
  if (bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id, 
        username: user.username
      }, 
      JWT_SECRET
    );
    return token;
  }
  return "Invalid password";
}
  
async function addUser(user) {
  const db = await collection();
  user.password = await bcrypt.hash(user.password, 10)
  await db.insertOne(user);
  return user;
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  login,
  changePassword,
};