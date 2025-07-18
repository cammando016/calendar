import sharedStyles from '../styles/shared.module.css';
import styles from '../styles/listedgroup.module.css';
import Link from 'next/link';
import { useGroup } from '@/context/GroupContext';

export default function ListedGroup ({ group, userCreated }) {
    const { updateActiveGroup } = useGroup();
    console.log(group);
    const handleEditClick = () => updateActiveGroup(group);

    return (
        //Display group details
        <div className={sharedStyles.colflex}>
            <div className={sharedStyles.rowflex}>
                <div style={{borderColor: group.groupcolour, background: group.groupcolour}} className={styles.groupcolour}></div>
                <div style={{borderColor: group.groupcolour}} className={`${styles.groupdisplay} ${sharedStyles.rowflex}`}>
                    <p className={styles.groupname}>{group.groupname}</p>
                    {
                        userCreated && (
                            <div style={{alignItems: "flex-end", justifyContent: 'flex-end'}} className={sharedStyles.colflex}>
                                <Link href={`/groups/${group.groupid}`}><button onClick={handleEditClick}>Edit</button></Link>
                                <button>Delete</button>
                            </div>
                        )
                    }
                </div>
            </div>
            <div>
                    {
                        group.members.map(member => {
                            return <p key={member}>{member}</p>
                        })
                    }
            </div>
        </div>
    )
}