//Reusable component to display each individual day in "month" view mode
import styles from '../styles/dayofmonth.module.css';
import sharedStyles from '../styles/shared.module.css';
import theme from '../styles/theme.module.css';
import { useEventList } from '@/context/EventListContext';
import { matchDates } from '@/utils/eventUtils';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function DayOfMonth({ date, inCurrentMonth }) {
    const dateObject = new Date(date);
    const { eventList } = useEventList();
    const dailyEvents = eventList.filter(listedEvent => matchDates(dateObject, listedEvent.eventstarttime.slice(0, 10)));
    const { user } = useUser();
    const today = new Date();
    today.setHours(0,0,0,0);

    return (
        <div className={`${sharedStyles.cardborder} ${user ? theme[`card${user.theme}`] : theme.cardgreen} ${styles.dayofmonth} ${sharedStyles.rowflex} ${inCurrentMonth ? '' : styles.offmonth} ${matchDates(new Date(), dateObject) ? user ? theme[`today${user.theme}`] : theme.todaygreen : ''}`}>
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

                    {/* Add event to selected date */}
                    {
                        dateObject >= today &&
                        <div className={`${styles.row} ${styles.bottomrow}`}>
                            <div className="add-event">
                                <Link style={{textDecoration: 'none'}} href={`/events/create/${date}`}><button style={{width: '5vw', height: '5vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}} className={`${sharedStyles.btn} ${sharedStyles.smallbtn} ${user ? theme[`btn${user.theme}`] : theme.btngreen }`}>+</button></Link>
                            </div>  
                        </div>
                    }
            </div>
        </div>
    )
}



            