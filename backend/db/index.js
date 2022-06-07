require("dotenv").config();
const pgp = require("pg-promise")({});
let cn =  "postgres://localhost:5432/firebase_auth";
const db = pgp(cn)

module.exports = db;