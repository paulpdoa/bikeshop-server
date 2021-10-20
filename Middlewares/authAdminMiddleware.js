const jwt = require('jsonwebtoken');

// for validation if the user is logged in or not
const validateToken = (req, res, next) => {
   const token = req.cookies.jwtAdmin;
//    check web token if existing
    if(token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decodedToken) => {
            if(err) {
                console.log(err.message);
                res.json({redirect:'/dashboard'})
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.json({redirect: '/admin/login', isAuth: false});
    }
}

module.exports = { validateToken }
