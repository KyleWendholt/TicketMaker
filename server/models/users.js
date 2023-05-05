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
  console.log(id, user);
  const db = await collection();
  const result = await db.updateOne({_id: new ObjectId(id)}, {$set: user});
  return result.modifiedCount === 1;
}

async function changePassword(token, oldPassword, newPassword) {
  const db = await collection();
  data = verifyToken(token);
  if (!data) {
    return "Invalid token";
  }
  const userid = data.userid;
  const user = await db.findOne({_id: new ObjectId(userid)});
  console.log(await bcrypt.compare(oldPassword, user.password));
  if (!user) {
    return "User not found";
  }
  if (!(await bcrypt.compare(oldPassword, user.password))) {
    return "Old password is incorrect";
  }
  user.password = await bcrypt.hash(newPassword, 10);
  return await updateUser(userid,user);
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
    return "Username or password is incorrect";
  }
  if (bcrypt.compare(password, user.password)) {
    const numWeeks = 2;
    const date = new Date();
    date.setDate(date.getDate() + numWeeks * 7);
    const token = jwt.sign(
      {
        userid: user._id, 
        username: user.username,
        timestamp: date.toString()
      }, 
      JWT_SECRET
    );
    return token;
  }
  return "Username or password is incorrect";
}
  
async function addUser(user) {
  const db = await collection();
  user.password = await bcrypt.hash(user.password, 10);
  if (await db.findOne({username: user.username})) {
    return false;
  }
  const result = await db.insertOne(user);
  return result.insertedCount === 1;
}

function verifyToken(JWTtoken) {
  try {
    data = jwt.verify(JWTtoken, JWT_SECRET);
    if (data.timestamp < new Date().toString()) {
      throw new Error("Token expired");
    }
    return data;
  } catch (error) {
    return false;
  }
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  login,
  changePassword,
  verifyToken
};