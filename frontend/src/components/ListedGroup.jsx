import sharedStyles from '../styles/shared.module.css';
import styles from '../styles/listedgroup.module.css';
import theme from '@/styles/theme.module.css';
import Link from 'next/link';
import { useGroup } from '@/context/GroupContext';
import { useEventList } from '@/context/EventListContext';
import DeleteModal from './DeleteModal';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';

export default function ListedGroup ({ group, userCreated, deleteGroup }) {
    const { updateActiveGroup, activeGroup } = useGroup();
    const { user } = useUser();
    // Get array of events for the group
    const { eventList } = useEventList();
    const groupEvents = eventList.filter(evt => evt.eventgroupid === group.groupid);

    //Show delete group confirmation dialog modal if user clicks on delete button
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const openDeleteModal = () => setShowDeleteAccount(true);
    const closeDeleteModal = () => setShowDeleteAccount(false);

    const deleteMessage = 'Are you sure you want to delete this group? This will also delete all events created for this group.';

    //Update active group to show group members, or set group to null if active group clicked again
    const handleClickMembers = () => {
        if (activeGroup === group) {
            updateActiveGroup(null)
        }
        else { updateActiveGroup(group);}
    }

    //Set active group for editing a group
    const handleClickEdit = () => updateActiveGroup(group);

    return (
        //Display group details
        <div className={`${sharedStyles.rowflex} ${sharedStyles.cardborder} ${user ? theme[`card${user.theme}`] : theme.cardgreen} ${styles.group}`}>
            <div className={`${sharedStyles.cardcolour}`} style={{backgroundColor: group.groupcolour, width: '5%'}}></div>
            <div style={{width: '95%'}} className={`${sharedStyles.colflex} ${sharedStyles.cardtext}`}>
                <div className={sharedStyles.rowflex}>
                    {/* Display group name & creator if not created by logged in user */}
                    <div className={`${styles.groupdisplay} ${sharedStyles.colflex}`}>
                        <h4 className={styles.groupp}>{group.groupname}</h4>
                        <p className={styles.groupp}>{groupEvents.length} upcoming event{groupEvents.length !== 1 && 's'}</p>
                        {
                            !userCreated && <p className={styles.groupp}>{group.creator}'s group</p>
                        }
                    </div>
                    {
                        !group.private && (
                            <div className={`${sharedStyles.colflex} ${sharedStyles.cardbuttons}`}>
                                {
                                    userCreated && (
                                        <div style={{marginBottom: '5px'}} className={`${sharedStyles.rowbtns} ${sharedStyles.rowflex}`}>
                                            <Link href={`/groups/${group.groupid}`}><button className={`${sharedStyles.medbtn} ${sharedStyles.btn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`} type="button" onClick={handleClickEdit}>Edit</button></Link>
                                            <button className={`${sharedStyles.medbtn} ${sharedStyles.btn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`} type="button" onClick={openDeleteModal}>Delete</button>
                                        </div>
                                    )
                                }
                                <div>
                                    <button className={`${sharedStyles.medbtn} ${sharedStyles.btn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`} type="button" onClick={handleClickMembers}>Toggle Members</button>
                                </div>
                            </div>
                        )
                    }
                    {
                        showDeleteAccount && (
                            <DeleteModal closeDelete={closeDeleteModal} handleDelete={() => {deleteGroup(group); closeDeleteModal()}} deleteMessage={deleteMessage} />
                        )
                    }
                </div>
                <div>
                        {
                            !group.private && (
                                activeGroup === group && (
                                    <div className={`${styles.groupmembers} ${sharedStyles.rowflex}`}>
                                        <div>
                                            <p className={styles.groupmemheading}><u>Group Members</u></p>
                                            {
                                                group.members.filter(memb => (memb.username !== group.creator)).map(member => {
                                                    return <p className={styles.groupp} key={member.username}>{member.username}</p>
                                                })
                                            }
                                        </div>
                                            
                                        <div>
                                            <p className={styles.groupmemheading}><u>Group Admin</u></p>
                                            {
                                                group.members.filter(memb => (memb.username === group.creator)).map(member => {
                                                    return <p className={styles.groupp} key={member.username}>{member.username}</p>
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            )
                        }
                </div>
            </div>
        </div>
    )
}