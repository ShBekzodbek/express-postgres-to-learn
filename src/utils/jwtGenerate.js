const jwt = require('jsonwebtoken');

require('dotenv').config();

const jwtGenerator = (user) => {
    const payload = {
        user: {
            email:user.email,
            role: user.role
        }
    }

    return jwt.sign(payload, process.env.jwt_secret);
}



module.exports = jwtGenerator;