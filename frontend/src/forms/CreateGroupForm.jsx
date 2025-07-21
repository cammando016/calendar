"use client"
//Create group form, store form inputs in createGroupForm state object defined in /groups/create page component
import sharedStyles from '../styles/shared.module.css';
import { useState } from 'react';
import Link from 'next/link';

export default function CreateGroupForm ({submitGroupFunc, createGroupForm, setGroupForm, addedUsers, setAddedUsers, user, editableGroup}) {
    //Empty array that will update with users added to the group before submitting
    const [newMember, setNewMember] = useState('');

    const submitText = editableGroup ? 'Edit Group' : 'Create Group';

    const addMember = (e) => {
        e.preventDefault()
        //Return without adding to addedUsers if input empty
        if (!newMember.trim()) return;
        //Add value from group member field to addedUsers
        setAddedUsers(prev => [...prev, newMember.trim()]);
        setNewMember('');
    }

    const removeMember = (removedUser) => {
        setAddedUsers(addedUsers.filter(user => (user != addedUsers[removedUser])));
    }

    return (
        <form onSubmit={submitGroupFunc}>
            <div className={sharedStyles.colflex}>
                <label htmlFor="group-name">Group Name</label>
                <input type="text" id="group-name" name="group-name" placeholder={ editableGroup ? editableGroup.groupname : 'Enter name for new group.' }  value={createGroupForm.groupName} onChange={(e) => setGroupForm({...createGroupForm, groupName: e.target.value})} required autoFocus />
            </div>

            <div className={sharedStyles.colflex}>
                <label htmlFor="group-colour">Group Colour</label>
                <input type="color" id="group-colour" name="group-colour" placeholder={ editableGroup ? editableGroup.groupcolour : undefined } value={createGroupForm.groupColour} onChange={(e) => setGroupForm({...createGroupForm, groupColour: e.target.value})} required />
            </div>

            <div className={sharedStyles.colflex}>
                <label htmlFor="group-members">Group Members - Please add one username at a time</label>
                <div className={sharedStyles.rowflex}>
                    <input type="text" id="group-members" name="group-members" value={newMember} onChange={(e) => setNewMember(e.target.value)} />
                    <div>
                        {
                            newMember === user.username ? (
                                <p>Group creator cannot be added to group as a member.</p>
                            ) : (
                                <button onClick={addMember}>Add Member</button>
                            )
                        }
                    </div>
                </div>
            </div>

            <div>
                {
                    addedUsers.filter(users => (users !== user.username)).map((addedUser, i) => {
                        return (
                            <div key={addedUser} className={sharedStyles.rowflex}>
                                <button onClick={() => removeMember(i)}>X</button>
                                <p>{addedUser}</p>
                            </div>
                        )
                    })
                }
            </div>

            <div>
                <Link href='/groups'><button>Cancel</button></Link>
                <button type="submit">{submitText}</button>
            </div>
            
        </form>
    )
}