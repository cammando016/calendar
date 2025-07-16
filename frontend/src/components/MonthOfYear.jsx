//Show each month within a year in yearly view mode
import { useDate } from '@/context/DateContext';
import styles from '../styles/monthofyear.module.css';

export default function MonthOfYear ({ month, date }) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateObject = new Date(date);
    const { setNewMonthView } = useDate();
    const eventCount = 3;
    return (
        //Show month name and number of events in the month
        <div className={`${styles.monthofyear}`}>
            <button onClick={() => { setNewMonthView(month, dateObject.getFullYear()) }}>{months[month]}</button>
            <p>{eventCount}</p>
        </div>
    )
}