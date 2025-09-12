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
    const dailyEvents = eventList.filter(listedEvent => matchDates(dateObject, listedEvent.displaydate.slice(0, 10)));
    const { user } = useUser();
    const userTheme = user?.theme || 'green';
    const today = new Date();
    today.setHours(0,0,0,0);

    return (
        <div className={`${sharedStyles.cardborder} ${theme[`card${userTheme}`]} ${styles.dayofmonth} ${sharedStyles.rowflex} ${inCurrentMonth ? '' : styles.offmonth} ${matchDates(new Date(), dateObject) ? theme[`today${userTheme}`] : ''}`}>
            {/* Display dot icons for list of events user is part of for the day */}
            {
                dailyEvents.length > 0 && (
                    <div className={`${sharedStyles.colflex} ${styles.eventicons}`}>
                        {
                            dailyEvents.slice(0,4).map(dailyEvent => (
                                dailyEvent.eventtype === 'birthdate' ?
                                <div key={dailyEvent.eventid} className={`${userTheme === 'blue' || userTheme === 'green' ? styles.birthdayiconalt : styles.birthdayicon}`}></div> :
                                <div key={dailyEvent.eventid} style={{backgroundColor: dailyEvent.groupcolour}} className={styles.eventicon}></div>
                            ))
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
                                <Link style={{textDecoration: 'none'}} href={`/events/create/${date}`}><button style={{width: '5vw', height: '5vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}} className={`${sharedStyles.btn} ${sharedStyles.smallbtn} ${theme[`btn${userTheme}`]}`}>+</button></Link>
                            </div>  
                        </div>
                    }
            </div>
        </div>
    )
}



            