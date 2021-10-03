//routes
const express = require("express");
const router = express.Router();
const {createUser, getAllUsers, getSingleUser, getUserId, updateUserPhoto, getUserPhoto} = require("../queries/users")
const {checkFirebaseToken} = require("../middleware/auth")


/* GET users listing. */
// router.get('/',checkFirebaseToken,getAllUsers);
router.get('/id/:email',getUserId);
router.get('/:email',getSingleUser);
router.get('/',getAllUsers);
router.post('/',createUser);
router.patch('/photo/:email',updateUserPhoto);
router.get('/photo/:email',getUserPhoto)

module.exports = router;