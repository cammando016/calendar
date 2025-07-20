import sharedStyles from '../styles/shared.module.css';
import styles from '../styles/listedgroup.module.css';
import Link from 'next/link';
import { useGroup } from '@/context/GroupContext';
import DeleteModal from './DeleteModal';
import { useState } from 'react';

export default function ListedGroup ({ group, userCreated, deleteGroup }) {
    const { updateActiveGroup, activeGroup } = useGroup();

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
        <div className={sharedStyles.colflex}>
            <div className={sharedStyles.rowflex}>
                <div style={{borderColor: group.groupcolour, background: group.groupcolour}} className={styles.groupcolour}>
                    <button onClick={handleClickMembers}>=</button>
                </div>
                <div style={{borderColor: group.groupcolour}} className={`${styles.groupdisplay} ${sharedStyles.rowflex}`}>
                    <p className={styles.groupname}>{group.groupname}</p>
                    {
                        userCreated && (
                            <div style={{alignItems: "flex-end", justifyContent: 'flex-end'}} className={sharedStyles.colflex}>
                                <Link href={`/groups/${group.groupid}`}><button onClick={handleClickEdit}>Edit</button></Link>
                                <button onClick={openDeleteModal}>Delete</button>
                            </div>
                        )
                    }
                </div>
                {
                    showDeleteAccount && (
                        <DeleteModal closeDelete={closeDeleteModal} handleDelete={() => {deleteGroup(group); closeDeleteModal()}} deleteMessage={deleteMessage} />
                    )
                }
            </div>
            <div>
                    {
                        activeGroup === group && (
                            <div className='group-members'>
                                <p>Group Members</p>
                                {
                                    group.members.map(member => {
                                        return <p key={member}>{member}</p>
                                    })
                                }
                            </div>
                        )
                    }
            </div>
        </div>
    )
}