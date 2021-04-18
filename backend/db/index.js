require("dotenv").config();
const pgp = require("pg-promise")({});
cn =  "postgres://localhost:5432/firebase_auth";
const db = pgp(cn)

module.exports = db;