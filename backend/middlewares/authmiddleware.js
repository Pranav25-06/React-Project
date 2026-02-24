const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

    const token = req.headers["authorization"];

   console.log(req);

    if (!token) {
        return res.status(401).json({ message: "Invalid token format." });
    }

    try {
        const decoded = jwt.verify(token, "MY_SECRET_KEY");

        // You are using employee instead of user
        req.employee = decoded;
        console.log("decode");

        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
}

module.exports = verifyToken;