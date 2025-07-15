//Show each month within a year in yearly view mode
import styles from '../styles/monthofyear.module.css';

export default function MonthOfYear ({ monthName }) {
    const eventCount = 3;
    return (
        //Show month name and number of events in the month
        <div className={`${styles.monthofyear}`}>
            <h3>{monthName}</h3>
            <p>{eventCount}</p>
        </div>
    )
}