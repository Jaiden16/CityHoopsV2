const db = require("../db/index");

const createUser = async (req, res, next) => {
    try {
        await db.none(
            'INSERT INTO users (id,email) VALUES ( ${id},${email})', req.body
        );
        res.json({
            message: "NEW USER CREATED!"
        })

    } catch (err) {
        next(err);
    }
}

const getAllUsers = async (req,res,next) =>{
    try{
        const users = await db.any("SELECT * FROM users");
        res.json({
            users,
            message:"All USERS"
        })

    }catch(err){
        next(err)
    }
}



// modules.exports ={createUser, getAllUsers}
module.exports = {createUser, getAllUsers}
