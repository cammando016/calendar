import sharedStyles from '../styles/shared.module.css';
import styles from '../styles/listedgroup.module.css';

export default function ListedGroup ({ group, userCreated }) {
    return (
        //Display group details
        <div styles={{backgroundColor: 'red'}} className={sharedStyles.rowflex}>
            <div style={{borderColor: group.groupcolour, background: group.groupcolour}} className={styles.groupcolour}></div>
            <div style={{borderColor: group.groupcolour}} className={`${styles.groupdisplay} ${sharedStyles.rowflex}`}>
                <p className={styles.groupname}>{group.groupname}</p>
                {
                    userCreated && (
                        <div style={{alignItems: "flex-end", justifyContent: 'flex-end'}} className={sharedStyles.colflex}>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

// className={styles.groupcolor}