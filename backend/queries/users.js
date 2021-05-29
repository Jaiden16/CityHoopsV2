const db = require("../db/index");

const createUser = async (req, res, next) => {
    try {
        await db.none(
            'INSERT INTO users (id,email,username) VALUES ( ${id},${email},${username} ) ', req.body
        );
        res.json({
            message: "NEW USER CREATED!"
        })

    } catch (err) {
        next(err);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await db.any("SELECT * FROM users");
        res.json({
            users,
            message: "All USERS"
        })

    } catch (err) {
        next(err)
    }
}

const getSingleUser = async(req,res,next) =>{
    try{
        const user = await db.oneOrNone(`SELECT username FROM users WHERE email = '${req.params.email}' `)
        console.log(user)
        res.json({
            user,
            message:"user"
        }).status(200)

    }catch(err){
        next(err)
    }
}

const getUserId = async (req,res,next) =>{
    try{
        const id = await db.oneOrNone(`SELECT usernum FROM users WHERE email = '${req.params.email}' `)
        console.log(id)
        res.json({
            id,
            message:'got it'
        }).status(200)

    }catch(err){

    }
}



// modules.exports ={createUser, getAllUsers}
module.exports = { createUser, getAllUsers, getSingleUser, getUserId };
