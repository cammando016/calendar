import express from 'express';
import dotenv from 'dotenv';
import pool from '../db/pool.js';

dotenv.config();
const router = express.Router();

/*new event values needed
- name
- notes (opt)
- start time
- start date
- end time
- end date
- created date (generate)
- invited group id
- creator id

*/

router.post('/events', async (req, res) => {
    try {
        //Get request variables
        const { eventName, eventType, eventNotes, eventInvited, eventStart, eventEnd, eventCreator } = req.body;

        if(!eventName || !eventType || !eventInvited || !eventStart || !eventEnd || !eventCreator) {
            return res.status(400).json({error: 'Missing required fields to create event'});
        }

        //Get userid from DB that matches username provided by eventCreator
        const creatorId = await pool.query('SELECT userid FROM users WHERE username = $1', [eventCreator]);

        //Calculate start/end date from eventStart & eventEnd values
        const startDate = new Date(Date.parse(eventStart.slice(0, 10)));
        const endDate = new Date(Date.parse(eventEnd.slice(0, 10)));
        
        const createdDate = new Date();

        //Insert event in DB
        await pool.query(
            `INSERT INTO events
            (eventname, eventnotes, eventstarttime, eventcreationdate, eventstartdate, eventgroupid, eventcreatorid, eventendtime, eventenddate)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [eventName, eventNotes, eventStart, createdDate, startDate, eventInvited, creatorId.rows[0].userid, eventEnd, endDate]
        );

        return res.status(200).json({message: 'request received'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})

router.get('/events', async (req, res) => {
    try {
        const { username } = req.query;

        const userQuery = await pool.query('SELECT userid FROM users WHERE username = $1', [username]);
        const userQueryId = userQuery.rows[0].userid;

        const events = await pool.query(
            `SELECT *
            FROM events e
            JOIN user_groups ug ON e.eventgroupid = ug.groupid
            WHERE ug.userid = $1`,
            [userQueryId]
        );

        return res.status(200).json({
            message: 'Event list successfully retrieved',
            eventList: events.rows
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})

export default router;