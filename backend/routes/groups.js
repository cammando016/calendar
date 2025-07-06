import express from 'express';
import dotenv from 'dotenv';
import pool from '../db/pool.js';

dotenv.config();
const router = express.Router();

router.post('/groups', async (req, res) => {
    try {
        console.log('Received create group request:', req.body);

        const {groupName, groupColour} = req.body;
        if (!groupName || !groupColour) {
            throw new Error ('Missing required fields');
        }
        const creationDate = new Date();

        try {
            console.log('Attempting to insert group');
            await pool.query(
                `INSERT INTO groups (groupname, groupcolour, creationdate)
                VALUES ($1, $2, $3)`,
                [groupName, groupColour, creationDate]
            );
            console.log('group insert');
            return res.status(201).json({message: 'Group Created'});
        }
        catch (error) {
            console.error('db insert error:', error);
            return res.status(500).json({error: error.message});
        }
    }
    catch (error) {
        console.error('Group creation error:', error);
        return res.status(500).json({error: error.message});
    }
});

export default router;