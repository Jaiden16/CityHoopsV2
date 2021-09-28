//routes
const express = require("express");
const router = express.Router();
const {getAllSkills, getSingleSkill,PatchUser} = require("../queries/skills")
const {checkFirebaseToken} = require("../middleware/auth")


// router.get('/',checkFirebaseToken,getAllUsers);
// router.get('/id/:email',getUserId)
/* GET skills listing. */
router.get('/:usernum',getSingleSkill)
router.get('/',getAllSkills);
router.patch('/:usernum',PatchUser);

module.exports = router;