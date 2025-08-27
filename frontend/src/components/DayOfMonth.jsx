//Reusable component to display each individual day in "month" view mode
import styles from '../styles/dayofmonth.module.css';
import sharedStyles from '../styles/shared.module.css';
import { useEventList } from '@/context/EventListContext';
import { matchDates } from '@/utils/eventUtils';
import Link from 'next/link';

export default function DayOfMonth({ date }) {
    const dateObject = new Date(date);
    const { eventList } = useEventList();
    const dailyEvents = eventList.filter(listedEvent => matchDates(dateObject, listedEvent.eventstarttime.slice(0, 10)));

    return (
        <div className={`${styles.dayofmonth} ${sharedStyles.rowflex} ${(new Date).getMonth() === dateObject.getMonth() ? '' : styles.offmonth} ${matchDates(new Date(), dateObject) ? styles.today : ''}`}>
            {/* Display dot icons for list of events user is part of for the day */}
            {
                dailyEvents.length > 0 && (
                    <div className={`${sharedStyles.colflex} ${styles.eventicons}`}>
                        {
                            dailyEvents.slice(0,4).map(dailyEvent => {
                                return <div key={dailyEvent.eventid} style={{backgroundColor: dailyEvent.groupcolour}} className={styles.eventicon}></div>
                            })
                        }
                    </div>
                )
            }
            <div className={`${styles.datedetails} ${sharedStyles.colflex}`}>
                <div className={`${styles.row} ${styles.toprow}`}>
                    {/* Display day of month */}
                    <div className="date">
                        <p>{dateObject.getDate()}</p>
                    </div>
                </div>

                <div className={`${styles.row} ${styles.bottomrow}`}>
                    {/* Add event to selected date */}
                    <div className="add-event">
                        <Link href={`/events/create/${date}`}><button className={`${sharedStyles.btn} ${sharedStyles.smallbtn}`}>+</button></Link>
                    </div>  
                </div>
            </div>
        </div>
    )
}



            