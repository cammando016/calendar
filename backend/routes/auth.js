import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../db/pool';

dotenv.config();
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, defaultview, recquestion, recanswer, password, birthdate } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const creationdate = new Date();

    try {
        await pool.query(
            `INSERT INTO users (username, defaultview, recquestion, recanswer, passwordhash, creationdate, birthdate)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
             [username, defaultview, recquestion, recanswer, passwordHash, creationdate, birthdate]
        );
        res.status(201).json({message: 'User Registered'});
    }
    catch (error) {
        res.status(500).json({error: error.message});
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
        res.json({token});
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default router;