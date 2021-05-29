const admin = require('../firebase');

const checkFirebaseToken = async (req, res, next) => {
    try {
        console.log(req.headers)
        const token = req.headers.authtoken;
        console.log("line6 ", token)
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
        req.user_id = uid;
        next()

    } catch (err) {
        // console.log("Code Broke!", err);
        res.status(401).json({ message: "NO Authenticated User" })

    }
}

module.exports = {
    checkFirebaseToken
}
