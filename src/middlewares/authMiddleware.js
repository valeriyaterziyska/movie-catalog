const jwt = require("../lib/jwt");
const { SECRET } = require("../config/configAuth");
const { decode } = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    const token = req.cookies["auth"];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);
        
        req.user = decodedToken; //attach token to req object
        res.locals.isAuthenticated = true;

        next();
    } catch (error) {
        res.clearCookie('auth');

        res.redirect('/auth/login');
    }

};

exports.isAuth = (req, res, next) => {
    if(!req.user) {
        return res.redirect('/auth/login');
    }

    next();
}
