const jwt = require("jsonwebtoken");

const authentication = async function (req, res, next) {
    try {
        let token = req.headers.token;
        if (!token) return res.status(400).send({ status: false, message: "Token not found!" });

        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        req.loggedInUser = decodedToken.userId;
        next();
    } catch (err) {
        return res.status(401).send({ status: false, message: err.message });
    }
};

module.exports = { authentication };