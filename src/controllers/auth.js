const jwtGenerator = require('../utils/jwtGenerate');

const jwt = require('jsonwebtoken');

const _ = require('lodash');

const hasher = require('../utils/generateSalt');

const bcrypt = require('bcryptjs');

require('dotenv').config();

const pool = require('../config/db');


module.exports = class auth {
    static async register(req, res, next) {
        const { name, email, password ,phone,role} = req.body;
        try {
            const isExist = await pool.query("SELECT * FROM users WHERE email=$1", [email])
            if (isExist.rows.length > 0) {
                return res.status(200).json({ Message: " Username already exist" });
            }
            const hashPassword = hasher(password);

            let newUser = await pool.query("INSERT INTO users (name, email, phone,password,role) VALUES($1, $2, $3,$4,$5 ) RETURNING *", [name, email, phone,hashPassword,role]);
            console.log(newUser.rows[0]);
            const jwtToken = jwtGenerator(newUser.rows[0]);

            return res.status(201).json({ jwtToken });

        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        const { password, email } = req.body;
        try {
            const token = req.headers['auth'];
            if (!token) {
                return res.status(403).send({ Message: "authorization danied" });
            }
            const verify = jwt.verify(token, process.env.jwt_secret);
        
            const isTrust = await pool.query("SELECT * FROM users WHERE username=$1", [verify.user.email]);

            console.log(isTrust);
            // const checkPassword = await bcrypt.compare(password,)

            if (!verify) {
                return res.status(403).send({ Message: "authorization danied " });
            }
            // bcrypt.compare(password,)
            console.log(verify.user.name);
            if (req.body.name == verify.user.name && isTrust.rows[0].id == verify.user.id) {
                res.statusCode = 200;
                res.send(isTrust)
                next();
                return;

            }
            return res.status(403).send({ Message: "authorization danied" });

        } catch (error) {
            next(error)
        }
    }
}