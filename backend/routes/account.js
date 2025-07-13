import express from 'express';
import dotenv from 'dotenv';
import pool from '../db/pool.js';

//Configure router
dotenv.config();
const router = express.Router();

//Update user account record in USERS table
router.patch('/edit', async(req, res) => {
    try {
        console.log('Received edit account request:', req.body);
        //Extract details submitted from edit account form
        const { username, firstname, birthdate, defaultview, usertheme, recquestion, recanswer } = req.body;
        //Check for user record in USERS with matching username submitted from edit account form
        const queryUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = queryUser.rows[0];

        //Return error message if username doesn't exist in DB
        if (!user) {
            return res.status(401).json({message: 'Invalid Username'});
        }

        try {
            console.log('Attempting to update user record');
            await pool.query(
                `UPDATE users SET firstname = $1, birthdate = $2, defaultview = $3, usertheme = $4, recquestion = $5, recanswer = $6
                WHERE username = $7`,
                [firstname, birthdate, defaultview, usertheme, recquestion, recanswer, username]
            );
            console.log('Account Updated');
            const updatedUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            return res.status(200).json({
                message: 'Account successfully updated',
                user: {
                    username: updatedUser.rows[0].username,
                    firstname: updatedUser.rows[0].firstname,
                    recoveryQuestion: updatedUser.rows[0].recquestion,
                    recoveryAnswer: updatedUser.rows[0].recanswer,
                    defaultView: updatedUser.rows[0].defaultview,
                    birthdate: updatedUser.rows[0].birthdate,
                    theme: updatedUser.rows[0].usertheme
                }
            });
        } catch (error) {
            console.error('DB update error:', error);
            return res.status(500).json({error: error.message});
        }
    } catch (error) {
        console.error('Edit account route error:', error);
        res.status(500).json({error: error.message});
    }
})

export default router;