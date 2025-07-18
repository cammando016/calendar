import express from 'express';
import dotenv from 'dotenv';
import pool from '../db/pool.js';

dotenv.config();
const router = express.Router();

router.post('/groups', async (req, res) => {
    try {
        console.log('Received create group request:', req.body);
        //Get group field values from request body
        const {groupName, groupColour, groupMembers, groupCreator} = req.body;
        //Check if any required fields are not provided
        if (!groupName || !groupColour) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        //Get db userid for submitted group members
        const userIdList = await pool.query(
            'SELECT userid FROM users WHERE username = ANY($1)', [groupMembers]
        );

        //Check there is at least one valid username provided for group members
        if (!userIdList.rows[0]) {
            return res.status(400).json({ error: 'No valid group member usernames provided' })
        }

        //Get userid for group creator
        const creatorQuery = await pool.query(
            'SELECT userid FROM users WHERE username = $1 ', [groupCreator]
        )
        const creatorUserId = creatorQuery.rows[0].userid;

        //Get current date for group created at
        const creationDate = new Date();

        try {
            //Add group to database
            console.log('Attempting to insert group');
            const insertGroup = await pool.query(
                `INSERT INTO groups (groupname, groupcolour, creationdate, createdby)
                VALUES ($1, $2, $3, $4)
                RETURNING groupid`
                ,[groupName, groupColour, creationDate, creatorUserId]
            );
            const newGroupId = insertGroup.rows[0].groupid;
            console.log('Group inserted with group id:', newGroupId);

            //Add group members to database
            console.log('Attempting to add group members to DB')

            //Generate query placeholders for userIdList
            const userIds = userIdList.rows.map(row => row.userid);
            const values = [];
            const placeholders = userIds.map((id, i) => {
                const base = i * 2;
                values.push(id, newGroupId);
                return `($${base + 1}, $${base + 2})`;
            }).join(', ');

            //Insert group members into user_groups table
            await pool.query( `INSERT INTO user_groups (userid, groupid) VALUES ${placeholders}`, values );
            //Insert group creator into user_groups table
            await pool.query( 'INSERT INTO user_groups (userid, groupid) VALUES ($1, $2)', [creatorUserId, newGroupId] );

            console.log('Group members inserted');
            return res.status(201).json({ message: 'Group Created' });
        } catch (error) {
            console.error('db insert error:', error);
            return res.status(500).json({error: error.message});
        }
    } catch (error) {
        console.error('Group creation error:', error);
        return res.status(500).json({error: error.message});
    }
});

router.get('/groups', async (req, res) => {
    try {
        console.log('Received request for list of groups', req.query);
        const { username } = req.query;
        const usernameQuery = await pool.query('SELECT userid FROM users WHERE username = $1', [username]);
        const user = usernameQuery.rows[0].userid;

        if (!user) { return res.status(401).json({error: 'Username not found'});}

        const groupsQuery = await pool.query(
            `SELECT u.username AS creator, g.groupname, g.groupcolour, g.groupid, array_agg(m.username) AS members
            FROM user_groups ug
            JOIN groups g ON ug.groupid = g.groupid
            JOIN users u ON g.createdby = u.userid
            JOIN user_groups ug2 ON g.groupid = ug2.groupid
            JOIN users m ON ug2.userid = m.userid
            WHERE ug.userid = $1
            GROUP BY g.groupid, g.groupname, g.groupcolour, u.username
            `,
            [user]
        );
        
        return res.status(200).json({
            message: 'Groups Found', 
            groups: groupsQuery.rows}
        );
    } catch(error) {
        console.error('Error:', error.message);
        return res.status(500).json({error: 'An error occurred while retrieving groups.'})
    }
})

router.patch('/groups', async (req, res) => {
    try {
        // -------- Update group name and/or colour if different to DB -----------
        console.log('Received request to update group', req.body);
        //Get data from front end request
        const { groupId, groupName, groupColour, groupMembers } = req.body;
        const groupQuery = await pool.query('SELECT * FROM groups WHERE groupid = $1', [groupId]);
        const groupQueryResult = groupQuery.rows[0];
        //Return error if group id submitted from front end not found in db
        if (!groupQueryResult) {return res.status(400).json({error: `Group ID: ${groupId} not found`})}

        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;

        if (groupName && groupName !== groupQueryResult.groupname) {
            updateFields.push(`groupname = $${paramIndex++}`);
            updateValues.push(groupName);
        }
        if (groupColour && groupColour !== groupQueryResult.groupcolour) {
            updateFields.push(`groupcolour = $${paramIndex++}`);
            updateValues.push(groupColour);
        }

        if (updateFields.length > 0) {
            updateValues.push(groupId);
            const updateGroupQuery = `UPDATE groups SET ${updateFields.join(', ')} WHERE groupid = $${paramIndex}`;

            console.log('Attempting to edit group record in DB')
            await pool.query(updateGroupQuery, updateValues);
            console.log('Group basics updated');
        };

        // ------------ Add new members to DB -----------

        //Get group members currently in database
        const groupMembersQuery = await pool.query('SELECT ug.userid, u.username FROM user_groups ug JOIN users u ON ug.userid = u.userid WHERE groupid = $1', [groupId])
        const dbGroupMembers = groupMembersQuery.rows;
        const dbUsernames = dbGroupMembers.map(dbMember => dbMember.username);
        
        //Check for any new members added to the group
        const newMembers = groupMembers.filter(username => !dbUsernames.includes(username));

        const newUserIds = [];
        for (const username of newMembers) {
            const result = await pool.query('SELECT userid FROM users WHERE username = $1', [username])
            if (result.rows.length > 0) {
                newUserIds.push(result.rows[0].userid);
            }
        }

        for (const userid of newUserIds) {
            await pool.query('INSERT INTO user_groups (userid, groupid) VALUES ($1, $2)', [userid, groupId]);
        }

        // ---------- Remove deleted users from DB ----------
        const membersToDelete = dbGroupMembers.filter(dbMember => !groupMembers.includes(dbMember.username));
        for (const member of membersToDelete) {
            await pool.query('DELETE FROM user_groups WHERE userid = $1 AND groupid = $2', [member.userid, groupId])
        }

        console.log('Group members updated');

        return res.status(200).json({ 
            message: 'Group successfully updated'
        });
            
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
})

export default router;