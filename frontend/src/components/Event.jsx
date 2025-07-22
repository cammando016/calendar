//Event details for each event shown on the weekly view
import { useState } from "react";
import sharedStyles from '../styles/shared.module.css';
import styles from '../styles/event.module.css';

export default function Event ({ eventRecord }) {
    //Only basic event details shown by default, user can toggle to see remaining details
    const [toggleDetails, setToggleDetails] = useState(false);
    //Show and hide remaining details
    const handleClick = () => setToggleDetails(prev => !prev);

    return (
        <div className={`${sharedStyles.rowflex} ${styles.event}`}>
            <div style={{backgroundColor: eventRecord.groupcolour, width: '10%'}}></div>
            <div style={{width: '90%'}} className={`${sharedStyles.colflex}`}>
                <div className={`${sharedStyles.rowflex}`}>
                    {/* Display event name and times */}
                    <div className={`${sharedStyles.colflex} ${styles.eventoverview}`}>
                        <p className={`${styles.eventp}`}>{eventRecord.eventname}</p>
                        <p className={`${styles.eventp}`}>Start: {eventRecord.eventstarttime.slice(11, 16)} - End: {eventRecord.eventendtime.slice(11, 16)}</p>
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
                            <p className={`${styles.eventp}`}>Event Notes: {eventRecord.eventnotes}</p>
                        </div>
                    )
                }   
            </div>
        </div>
    )
}