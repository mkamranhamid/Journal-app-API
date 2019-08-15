const { verify } = require('jsonwebtoken');

const { errorResponse } = require('../util/common');

function isAuth(req, res, next) {
    const authHeader = req.get('Authorization');
    var errResp = errorResponse('Unauthenticated!! Please sign in to perform this action', 501);
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader;
    if (!token) {
        req.isAuth = false;
        return next();
    }
    try {
        var isVerified = verify(token, process.env.JWT_SECRET);
    } catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!isVerified) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.uid = isVerified.id;
    return next();
}

module.exports = isAuth;