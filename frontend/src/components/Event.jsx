//Event details for each event shown on the weekly view
import sharedStyles from '../styles/shared.module.css';
import styles from '../styles/event.module.css';
import Link from 'next/link';

export default function Event ({ eventRecord, updateEvent, setEdit, activeEvent }) {
    //Show and hide remaining details
    const handleClick = () => updateEvent(eventRecord.eventid);
    const handleEditClick = () => setEdit(eventRecord.eventid);

    return (
        <div className={`${sharedStyles.rowflex} ${styles.event}`}>
            <div style={{backgroundColor: eventRecord.groupcolour, width: '10%'}}></div>
            <div style={{width: '90%'}} className={`${sharedStyles.colflex}`}>
                <div className={`${sharedStyles.rowflex}`}>
                    {/* Display event name and times */}
                    <div className={`${sharedStyles.colflex} ${styles.eventoverview}`}>
                        <p className={`${styles.eventp}`}>{eventRecord.eventname}</p>
                        <p className={`${styles.eventp}`}>{eventRecord.eventstarttime.slice(0, 10)} {eventRecord.eventstarttime.slice(11, 16)} - {eventRecord.eventendtime.slice(0, 10)} {eventRecord.eventendtime.slice(11, 16)}</p>
                    </div>
                    <div className={`${sharedStyles.colflex}`}>
                        <div className={`${sharedStyles.rowflex}`}>
                            <Link href={`/events/${eventRecord.eventid}`}><button type="button" onClick={handleEditClick}>Edit</button></Link>
                            <button type="button">Delete</button>
                        </div>
                        <div>
                            <button type="button" onClick={handleClick}>Toggle Details</button>
                        </div>
                    </div>
                </div>
                {
                    activeEvent === eventRecord.eventid && (
                        <div className={`${sharedStyles.colflex}`}>
                            <p className={`${styles.eventp}`}>Group Name: {eventRecord.groupname}</p>
                            <p className={`${styles.eventp}`}>Created By: {eventRecord.username}</p>
                            <p className={`${styles.eventp}`}>Event Notes: {eventRecord.eventnotes}</p>
                        </div>
                    )
                }   
            </div>
        </div>
    )
}