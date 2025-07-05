import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../db/pool.js';

dotenv.config();
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        console.log('Received signup request:', req.body);

        const { username, defaultview, recquestion, recanswer, password, birthdate, firstname, usertheme } = req.body;

        if(!username || !password || !defaultview || !recquestion || !recanswer || !birthdate || !firstname || !usertheme) {
            throw new Error('Missing required fields');
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const creationdate = new Date();

        try {
            console.log('attempt to insert user');
            await pool.query(
                `INSERT INTO users (username, defaultview, recquestion, recanswer, passwordhash, creationdate, birthdate, firstname, usertheme)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [username, defaultview, recquestion, recanswer, passwordHash, creationdate, birthdate, firstname, usertheme]
            );
            console.log('user inserted');
            return res.status(201).json({message: 'User Registered'});
        }
        catch (error) {
            console.error('db insert error:', error);
            return res.status(500).json({error: error.message});
        }
    }
    catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({error: error.message});
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({message: 'Invalid Username'})
        }
        else if (!(await bcrypt.compare(password, user.passwordhash))) {
            return res.status(401).json({message: 'Incorrect Password'})
        }

        const token = jwt.sign({id: user.userid}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).json({
            message: 'Login Successful',
            token,
            user: {
                username: user.username,
                firstname: user.firstname,
                recoveryQuestion: user.recquestion,
                defaultView: user.defaultview,
                birthdate: user.birthdate,
                theme: user.usertheme
            }
        });
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default router;