const { connect } = require("./mongo");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET ?? "";
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET ?? "";

async function collection() {
  const client = await connect();
  return client.db("TicketMaker").collection("users");
}

function authToken(req, res, next) {
  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, ACCESS_JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function authRefreshToken(req, res, next) {
  const cookie = req.headers.cookie;
  const token = cookie && cookie.split("refreshToken=")[1]?.split(";")[0];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, REFRESH_JWT_SECRET, (err, payload) => {
    const { iat, exp, ...user } = payload;
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

async function authenticateUser(email, password) {
  const db = await collection();
  const user = await db.findOne({ email: email });
  if (!user) {
    return null;
  }
  if (await bcrypt.compare(password, user.password)) {
    return user;
  }
}

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_JWT_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, REFRESH_JWT_SECRET, { expiresIn: "7d" });
}

const refreshTokenLife = 60 * 60 * 24 * 7;

module.exports = {
  authenticateUser,
  authToken,
  refreshTokenLife,
  generateAccessToken,
  generateRefreshToken,
  authRefreshToken,
};
