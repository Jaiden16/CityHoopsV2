const db = require("../db/index");

const createUser = async (req, res, next) => {
    let query1 = 'INSERT INTO users (id,email,username) VALUES ( ${id},${email},${username}) RETURNING*'
    let query2 = 'INSERT INTO info (player,nickname) VALUES(${usernum}, ${username}) RETURNING*'
    let query3 = 'INSERT INTO skills (player) VALUES(${usernum}) RETURNING*'

    try {
        let addPlayer = await db.one(query1, req.body);
        console.log(addPlayer)
        console.log(parseInt(addPlayer.usernum))
        let addPlayerInfo = await db.one(query2, addPlayer);
        let addSkillsInfo = await db.one(query3, addPlayer);

        res.json({
            player: addPlayer,
            info: addPlayerInfo,
            skills: addSkillsInfo,
            message: "NEW USER CREATED!"
        })

    } catch (err) {
        console.log(err)
        // next(err);
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

const getSingleUser = async (req, res, next) => {
    try {
        const user = await db.oneOrNone(`SELECT username, usernum FROM users WHERE email = '${req.params.email}' `)
        console.log(user)
        res.json({
            user,
            message: "user"
        }).status(200)

    } catch (err) {
        next(err)
    }
}

const getUserId = async (req, res, next) => {
    
    try {
        const id = await db.oneOrNone(`SELECT usernum FROM users WHERE email = '${req.params.email}' `)
        console.log(id)
        res.json({
            id,
            message: 'got it'
        }).status(200)

    } catch (err) {

    }
}

const updateUserPhoto = async (req, res, next) => {
    let pictureObj = {
        url: req.body.url,
        email: req.params.email
    }
    
    let query = 'UPDATE users SET profile_url = ${url} WHERE email = ${email} RETURNING *'
    
    
    try {
        let photo = await db.one(query,pictureObj)
        res.json({
            url: photo,
            message: "success"
        })

    } catch {
        console.log(err)
    }
}

const getUserPhoto = async (req,res,next) =>{
    let query = `SELECT profile_url FROM users WHERE email = '${req.params.email}' `
    try{
        let photo = await db.one(query)
        res.json({
            url: photo,
            message: "Success"
        })
        
    }catch(err){
        console.log(err)
    }
}



// modules.exports ={createUser, getAllUsers}
module.exports = { createUser, getAllUsers, getSingleUser, getUserId, updateUserPhoto, getUserPhoto};
