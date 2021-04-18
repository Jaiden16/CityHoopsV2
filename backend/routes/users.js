//routes
const express = require("express");
const router = express.Router();
const {createUser, getAllUsers} = require("../queries/users")


/* GET users listing. */
router.get('/',getAllUsers);
router.post('/',createUser);



module.exports = router;
