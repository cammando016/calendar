"use client"
//Create group form, store form inputs in createGroupForm state object defined in /groups/create page component
import sharedStyles from '../styles/shared.module.css';
import styles from '../styles/forms.module.css';
import theme from '../styles/theme.module.css';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { compareMemberArrays } from '@/utils/createGroup';

export default function CreateGroupForm ({submitGroupFunc, createGroupForm, setGroupForm, addedUsers, setAddedUsers, user, editableGroup}) {
    const userTheme = user?.theme || 'green';
    //Empty array that will update with users added to the group before submitting
    const [newMember, setNewMember] = useState('');
    const submitText = editableGroup ? 'Edit Group' : 'Create Group';
    const existingMembers = editableGroup ? editableGroup.members.map(member => member.username) : null;

    const groupName = createGroupForm?.groupName || '';
    const groupColour = createGroupForm?.groupColour || '';

    const addMember = (e) => {
        e.preventDefault()
        //Return without adding to addedUsers if input empty
        if (!newMember.trim()) return;
        //Add value from group member field to addedUsers
        setAddedUsers(prev => [...prev, newMember.trim().toLowerCase()]);
        setNewMember('');
    }

    const removeMember = (removedUser) => {
        setAddedUsers(addedUsers.filter(user => (user != removedUser)));
    }

    const validForm = useMemo (() => {
        if (!createGroupForm) return false;

        if (editableGroup) {
            return (
                groupName.trim() !== '' && 
                addedUsers.length > 1 &&
                (
                    groupName.trim() !== editableGroup.groupname?.trim() ||
                    !compareMemberArrays(addedUsers, existingMembers) ||
                    groupColour !== editableGroup.groupcolour
                )
            );
        }
        else {
            return (
                groupName.trim() !== '' && 
                addedUsers.length > 0
            )
        }
    }, [groupName, groupColour, addedUsers, existingMembers, editableGroup]);

    if (!user) return <div><p>Please wait, loading...</p></div>

    return (
        <div>
            <div className={`${sharedStyles.rowflex} ${sharedStyles.sectionheading}`}>
                <h3>{submitText}</h3>
            </div>
            <form id='create-group' onSubmit={submitGroupFunc}>
                <fieldset className={`${styles.fieldset} ${theme[`fldst${userTheme}`]}`}>
                    <div className={sharedStyles.colflex}>
                        <label className={styles.formLabel} htmlFor="group-name">Group Name *</label>
                        <input className={`${styles.formInput} ${groupName === '' ? styles.invalidInput : null}`} maxLength={18} type="text" id="group-name" name="group-name" placeholder={ editableGroup ? editableGroup.groupname : 'Enter name for new group.' }  value={groupName} onChange={(e) => setGroupForm({...createGroupForm, groupName: e.target.value})} required autoFocus />
                        <p className={`${groupName === '' ? styles.invalidMessage : styles.validMessage}`}><em>Group name must not be empty</em></p>
                    </div>

                    <div className={sharedStyles.colflex}>
                        <label className={styles.formLabel} htmlFor="group-colour">Group Colour</label>
                        <input type="color" id="group-colour" name="group-colour" placeholder={ editableGroup ? editableGroup.groupcolour : '#FFFFFF' } value={groupColour} onChange={(e) => setGroupForm({...createGroupForm, groupColour: e.target.value})} required />
                    </div>

                    <div className={sharedStyles.colflex}>
                        <label className={styles.formLabel} htmlFor="group-members">Group Members *</label>
                        <div className={sharedStyles.colflex}>
                            <input className={`${styles.formInput} ${addedUsers.length === 0 ? styles.invalidInput : null}`} type="text" id="group-members" name="group-members" value={newMember} placeholder='Enter username for new member.' onChange={(e) => setNewMember(e.target.value)} />
                            <div>
                                {
                                    newMember === user.username ? (
                                        <p className={`${styles.invalidMessage}`}><em>Group creator cannot be added to group as a member</em></p>
                                    ) : (
                                        <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`} type='button' onClick={addMember} disabled={newMember === ''}>Add To Member List</button>
                                    )
                                }
                            </div>
                            <p className={`${addedUsers.length <= (editableGroup ? 1 : 0) ? styles.invalidMessage : styles.validMessage}`}><em>Group must have at least 1 member</em></p>
                        </div>
                    </div>
                </fieldset>

                <div>
                    <Link href='/groups'><button type='button' className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`}>Cancel</button></Link>
                    <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`} type="submit" disabled={!validForm}>{submitText}</button>  
                </div>
                
            </form>

            <div>
                {
                    addedUsers.length > (editableGroup ? 1 : 0) && <h4 style={{paddingLeft: '5px', marginTop: '20px', marginBottom: '10px'}}>Added Members</h4>
                }
                <div className={`${sharedStyles.overflowsmall}`}>
                {
                    addedUsers.filter(users => (users !== user.username)).map((addedUser, i) => {
                        return (
                            <div key={addedUser} className={`${styles.memberList} ${sharedStyles.rowflex} ${sharedStyles.cardborder}  ${theme[`card${userTheme}`]} ${sharedStyles.cardcolour}`}>
                                    <button className={`${sharedStyles.btn} ${sharedStyles.smallbtn} ${theme[`btn${userTheme}`]}`} type='button' onClick={() => removeMember(addedUser)}>X</button>
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