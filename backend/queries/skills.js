const db = require("../db/index")

const getAllSkills = async (req, res) => {
    try{
        let allSkills = await db.any("Select * From skills")
        res.json({
            skills: allSkills,
            message:"Got Skills"
        })
    }catch(err){
        console.log(err)
        res.json({
            message: `Message: ${err}`
        })
    }

}

const getSingleSkill = async (req,res) =>{
    //get one skill
    try {
      let query =  `SELECT shooting,handle,perimiter_defence,interior_defence, 
                    rebounding,steals,blocks,iq,leadership FROM skills 
                    JOIN users ON skills.player = users.usernum WHERE users.usernum = ${req.params.usernum}`
        let oneSkill = await db.one(query, [req.params.id])

        res.json({
            user: oneSkill,
            message: "Success"
        })

    } catch (err) {
        res.json({
            message: `Error: ${err}`
        })
    }
}

//patch skill

const PatchUser = async (req, res) => {
    console.log("req.body", req.body)
    console.log("back end", req.body.shooting)
    
    try {
        let patch;
        let userUpdates = {
            id: parseInt(req.params.usernum),
            shooting: parseInt(req.body.shooting),
            handle: parseInt(req.body.handle),
            perimiter_defence: parseInt(req.body.perimiter_defence),
            interior_defence: parseInt(req.body.interior_defence),
            rebounding: parseInt(req.body.rebounding),
            steals: parseInt(req.body.steals),
            blocks: parseInt(req.body.blocks),
            iq: parseInt(req.body.iq),
            leadership: parseInt(req.body.leadership)
        }
        console.log("back end object", userUpdates)


        let query = `UPDATE skills SET `;
        let endQuery = `WHERE player = $/id/ RETURNING *`

        if (req.body.shooting) {
            query += `shooting = $/shooting/, `
        }


        if (req.body.handle) {
            query += `handle = $/handle/, `
        }

        if (req.body.perimiter_defence) {
            query += `perimiter_defence = $/perimiter_defence/, `
        }

        if (req.body.interior_defence) {
            query += `interior_defence = $/interior_defence/, `
        }

        if (req.body.rebounding) {
            query += `rebounding = $/rebounding/, `
        }

        if (req.body.steals) {
            query += `steals = $/steals/, `
        }

        if (req.body.blocks) {
            query += `blocks = $/blocks/, `
        }

        if (req.body.iq) {
            query += `iq = $/iq/, `
        }

        if (req.body.leadership) {
            query += `leadership = $/leadership/, `
        }

        indx = query.lastIndexOf(',')

        if (query[indx] === ",") {
            let lastIndex = query.lastIndexOf(',');
            let newString = query.substring(0, lastIndex)
            console.log("114", newString)
            query = newString
        }

        let fullQuery = query + endQuery
        patch = await db.one(fullQuery, userUpdates);
        
        res.json({
            data: patch,
            message: "success"
        })

    } catch (err) {
        console.log(err)
        
        res.json({
            message: `Error: ${err}`
        })
    }
}


module.exports = { getAllSkills, getSingleSkill, PatchUser }