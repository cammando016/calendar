"use client"
//Create group form, store form inputs in createGroupForm state object defined in /groups/create page component
import sharedStyles from '../styles/shared.module.css';
import styles from '../styles/forms.module.css';
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
        setAddedUsers(prev => [...prev, newMember.trim().toLowerCase()]);
        setNewMember('');
    }

    const removeMember = (removedUser) => {
        setAddedUsers(addedUsers.filter(user => (user != addedUsers[removedUser])));
    }

    return (
        <div>
            <div className={`${sharedStyles.rowflex} ${sharedStyles.sectionheading}`}>
                <h3>{submitText}</h3>
            </div>
            <form id='create-group' onSubmit={submitGroupFunc}>
                <fieldset className={styles.fieldset}>
                    <div className={sharedStyles.colflex}>
                        <label className={styles.formLabel} htmlFor="group-name">Group Name *</label>
                        <input className={styles.formInput} type="text" id="group-name" name="group-name" placeholder={ editableGroup ? editableGroup.groupname : 'Enter name for new group.' }  value={createGroupForm.groupName} onChange={(e) => setGroupForm({...createGroupForm, groupName: e.target.value})} required autoFocus />
                    </div>

                    <div className={sharedStyles.colflex}>
                        <label className={styles.formLabel} htmlFor="group-colour">Group Colour</label>
                        <input type="color" id="group-colour" name="group-colour" placeholder={ editableGroup ? editableGroup.groupcolour : undefined } value={createGroupForm.groupColour} onChange={(e) => setGroupForm({...createGroupForm, groupColour: e.target.value})} required />
                    </div>

                    <div className={sharedStyles.colflex}>
                        <label className={styles.formLabel} htmlFor="group-members">Group Members - Minimum 1 required *</label>
                        <div className={sharedStyles.colflex}>
                            <input className={styles.formInput} type="text" id="group-members" name="group-members" value={newMember} placeholder='Enter username for new member.' onChange={(e) => setNewMember(e.target.value)} />
                            <div style={{marginTop: '10px'}}>
                                {
                                    newMember === user.username ? (
                                        <p style={{margin: '0'}}><em>Group creator cannot be added to group as a member.</em></p>
                                    ) : (
                                        <button className={`${sharedStyles.btn} ${sharedStyles.medbtn}`} type='button' onClick={addMember}>Add To Member List</button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </fieldset>

                <div>
                    <Link href='/groups'><button type='button' className={`${sharedStyles.btn} ${sharedStyles.medbtn}`}>Cancel</button></Link>
                    <button className={`${sharedStyles.btn} ${sharedStyles.medbtn}`} type="submit">{submitText}</button>  
                </div>
                
            </form>

            <div>
                {
                    addedUsers.length > 0 && <h4 style={{paddingLeft: '5px', marginTop: '20px', marginBottom: '10px'}}>Added Members</h4>
                }
                <div className={`${sharedStyles.overflowsmall}`}>
                {
                    addedUsers.filter(users => (users !== user.username)).map((addedUser, i) => {
                        return (
                            <div key={addedUser} className={`${styles.memberList} ${sharedStyles.rowflex} ${sharedStyles.cardborder} ${sharedStyles.cardcolour}`}>
                                    <button className={`${sharedStyles.btn} ${sharedStyles.smallbtn}`} type='button' onClick={() => removeMember(i)}>X</button>
                                    <p className={styles.memberName}>{addedUser}</p>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}