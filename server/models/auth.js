const {connect} = require('./mongo');
const {ObjectId} = require('mongodb');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET ?? "";

async function collection() {
  const client = await connect();
  return client.db('TicketMaker').collection('users');
}


//returns the data from the JWT token if it is valid, otherwise returns an error message
function authToken(JWTtoken) {
  try {
    data = jwt.verify(JWTtoken, JWT_SECRET);
    if (data.timestamp < new Date().toString()) {
      throw new Error("Token expired");
    }
    return data;
  } catch (error) {
    return error.message;
  }
}

async function login(username, password) {
  const db = await collection();
  const user = await db.findOne({ username: username });
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
        timestamp: date.toString(),
      },
      JWT_SECRET
    );
    return token;
  }
  return "Username or password is incorrect";
}

module.exports = {
  login,
  authToken,
};