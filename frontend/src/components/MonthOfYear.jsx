//Show each month within a year in yearly view mode
import { useDate } from '@/context/DateContext';
import styles from '../styles/monthofyear.module.css';
import sharedStyles from '../styles/shared.module.css';
import theme from '../styles/theme.module.css';
import { useUser } from '@/context/UserContext';
import { useEventList } from '@/context/EventListContext';

export default function MonthOfYear ({ month, date }) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateObject = new Date(date);
    const { setNewMonthView } = useDate();

    const { user } = useUser();
    const { eventList } = useEventList();
    const eventCount = eventList.filter(evt => (new Date(evt.eventstarttime.slice(0,10)).getMonth() === month && (new Date(evt.eventstarttime.slice(0, 10)).getFullYear() === dateObject.getFullYear()))).length
    return (
        //Show month name and number of events in the month
        <div className={`${styles.monthofyear} ${sharedStyles.cardborder} ${user ? theme[`card${user.theme}`] : theme.cardgreen} ${sharedStyles.cardcolour}`}>
            <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`} type='button' onClick={() => { setNewMonthView(month, dateObject.getFullYear()) }}>{months[month]}</button>
            <p className={styles.monthp}>{eventCount} events</p>
        </div>
    )
}