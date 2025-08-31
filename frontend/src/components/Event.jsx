//Event details for each event shown on the weekly view
import sharedStyles from '../styles/shared.module.css';
import styles from '../styles/event.module.css';
import Link from 'next/link';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Event ({ eventRecord, updateEvent, setEdit, activeEvent, deleteEvent, userCreated, hideToggle }) {
    //Show and hide remaining details
    const handleClick = () => updateEvent(eventRecord.eventid);
    const handleEditClick = () => setEdit(eventRecord.eventid);

    return (
        <div className={`${sharedStyles.cardborder} ${sharedStyles.rowflex} ${styles.event}`}>
            <div className={sharedStyles.cardcolour} style={{backgroundColor: eventRecord.groupcolour, width: '5%'}}></div>
            <div style={{width: '95%'}} className={`${sharedStyles.colflex} ${sharedStyles.cardtext}`}>
                <div className={`${sharedStyles.rowflex}`}>
                    {/* Display event name and times */}
                    <div className={`${sharedStyles.colflex} ${styles.eventoverview}`}>
                        <h4 className={`${styles.eventp}`}>{eventRecord.eventname}</h4>
                        <p className={`${styles.eventp}`}>{months[parseInt(eventRecord.eventstarttime.slice(5,7))-1]} {eventRecord.eventstarttime.slice(8, 10)} { eventRecord.eventstarttime.slice(0,10) !== eventRecord.eventendtime.slice(0,10) && '- ' + months[parseInt(eventRecord.eventendtime.slice(5, 7))-1] + ' ' + eventRecord.eventendtime.slice(8, 10) }</p>
                        <p className={`${styles.eventp}`}>{eventRecord.eventstarttime.slice(11, 16)} - {eventRecord.eventendtime.slice(11, 16)}</p>
                    </div>
                    <div className={`${sharedStyles.colflex} ${sharedStyles.cardbuttons}`}>
                        {
                            userCreated && (
                                <div className={`${sharedStyles.rowflex}`}>
                                    <Link href={`/events/${eventRecord.eventid}`}><button className={`${sharedStyles.medbtn} ${sharedStyles.btn}`} type="button" onClick={handleEditClick}>Edit</button></Link>
                                    <button className={`${sharedStyles.medbtn} ${sharedStyles.btn}`} type="button" onClick={() => deleteEvent(eventRecord.eventid)}>Delete</button>
                                </div>
                            )
                        }
                        {
                            !hideToggle && (
                                <div>
                                <button className={`${sharedStyles.medbtn} ${sharedStyles.btn}`} type="button" onClick={handleClick}>Toggle Details</button>
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    activeEvent === eventRecord.eventid && (
                        <div className={`${sharedStyles.colflex}`}>
                            <p className={`${styles.eventp}`}>Group: {eventRecord.groupname}</p>
                            <p className={`${styles.eventp}`}>Created By: {eventRecord.username}</p>
                            <p className={`${styles.eventp}`}>Event Notes: {eventRecord.eventnotes}</p>
                        </div>
                    )
                }   
            </div>
        </div>
    )
}