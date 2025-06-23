import { useState } from "react";
import sharedStyles from '../styles/shared.module.css';
import styles from '../styles/event.module.css';

export default function Event () {
    const [toggleDetails, setToggleDetails] = useState(false);
    const handleClick = () => setToggleDetails(prev => !prev);

    return (
        <div className={`${sharedStyles.colflex} ${styles.event}`}>
            <div className={`${sharedStyles.rowflex}`}>
                <div className={`${sharedStyles.colflex} ${styles.eventoverview}`}>
                    <p className={`${styles.eventp}`}>Event Name</p>
                    <p className={`${styles.eventp}`}>Start:Time - End:Time</p>
                </div>
                <div className={`${sharedStyles.colflex}`}>
                    <div className={`${sharedStyles.rowflex}`}>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                    <div>
                        <button onClick={handleClick}>Toggle Details</button>
                    </div>
                </div>
            </div>
            {
                toggleDetails && (
                    <div className={`${sharedStyles.colflex}`}>
                        <p className={`${styles.eventp}`}>Group Name: </p>
                        <p className={`${styles.eventp}`}>Created By: </p>
                        <p className={`${styles.eventp}`}>Event Notes: </p>
                    </div>
                )
            }   
        </div>
    )
}