import express from 'express';
import dotenv from 'dotenv';
import pool from '../db/pool.js';

dotenv.config();
const router = express.Router();

router.post('/events', async (req, res) => {
    try {
        //Get request variables
        const { eventName, eventType, eventNotes, eventInvited, eventStart, eventEnd, eventCreator } = req.body;
        console.log(req.body);

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
            (eventname, eventtype, eventnotes, eventstarttime, eventcreationdate, eventstartdate, eventgroupid, eventcreatorid, eventendtime, eventenddate)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [eventName, eventType, eventNotes, eventStart, createdDate, startDate, eventInvited, creatorId.rows[0].userid, eventEnd, endDate]
        );

        return res.status(200).json({message: 'request received'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: error.message});
    }
})

router.get('/events', async (req, res) => {
    try {
        const { username } = req.query;

        const userQuery = await pool.query('SELECT userid FROM users WHERE username = $1', [username]);
        const userQueryId = userQuery.rows[0].userid;

        const firstOfMonth = new Date();
        firstOfMonth.setDate(1);
        firstOfMonth.setHours(0,0,0,0);

        const events = await pool.query(
            `SELECT e.eventcreationdate, e.eventendtime, e.eventid, e.eventname, e.eventnotes, e.eventstarttime, e.eventtype, e.eventgroupid, u.username, g.groupname, g.groupcolour
            FROM events e
            JOIN user_groups ug ON e.eventgroupid = ug.groupid
            JOIN users u ON e.eventcreatorid = u.userid
            JOIN groups g ON e.eventgroupid = g.groupid
            WHERE ug.userid = $1
            AND e.eventstarttime >= $2
            ORDER BY e.eventstarttime ASC`,
            [userQueryId, firstOfMonth]
        );

        return res.status(200).json({
            message: 'Event list successfully retrieved',
            eventList: events.rows
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({error: error.message});
    }
})

router.patch('/events', async (req, res) => {
    try {
        //submitted values
        const { eventId, eventName, eventType, eventNotes, eventStart, eventEnd } = req.body;

        //Get existing details for event ID and check which have changed
        const eventQuery = await pool.query('SELECT eventname, eventnotes, eventstarttime, eventendtime, eventtype FROM events WHERE eventid = $1', [eventId]);
        const eventQueryResult = eventQuery.rows[0];

        const updateValues = [], updateFields = [];
        let placeholderIterator = 2;

        if (eventName !== eventQueryResult.eventname) {
            updateValues.push(eventName);
            updateFields.push(`eventname = $${placeholderIterator}`);
            placeholderIterator ++;
        }
        if (eventType !== eventQueryResult.eventtype) {
            updateValues.push(eventType);
            updateFields.push(`eventtype = $${placeholderIterator}`);
            placeholderIterator ++;
        }
        if (eventNotes !== eventQueryResult.eventnotes) {
            updateValues.push(eventNotes);
            updateFields.push(`eventnotes = $${placeholderIterator}`);
            placeholderIterator ++;
        }
        if (eventStart !== eventQueryResult.eventstarttime) {
            updateValues.push(eventStart);
            updateFields.push(`eventstarttime = $${placeholderIterator}`);
            placeholderIterator ++;
        }
        if (eventEnd !== eventQueryResult.eventendtime) {
            updateValues.push(eventEnd);
            updateFields.push(`eventendtime = $${placeholderIterator}`);
            placeholderIterator ++;
        }

        if (updateFields.length === 0) {
            return res.status(200).json({message: 'No changes made to event'});
        }

        //Update DB
        await pool.query(
            `UPDATE events SET ${updateFields.join(', ')} WHERE eventid = $1`, 
            [eventId, ...updateValues]
        );

        return res.status(200).json({ message: 'Event updated in database' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message })
    }
})

router.delete('/events', async (req, res) => {
    try {
        const { eventId } = req.body;

        await pool.query('DELETE FROM events WHERE eventid = $1', [eventId]);

        return res.status(200).json({message: 'Event Deleted'});

    } catch (error) {
        console.error(error);
        return res.status(500).json({error: error.message});
    }
})

export default router;