//Reusable component to display each individual day in "month" view mode
import styles from '../styles/dayofmonth.module.css'
import { useEventList } from '@/context/EventListContext';

export default function DayOfMonth({ date }) {
    //const eventCount = 0;
    const dateObject = new Date(date);
    const { eventList } = useEventList();

    const eventCount = eventList.filter(listedEvent => ((new Date(listedEvent.eventstartdate)).getDate()) === dateObject.getDate()).length;

    return (
        <div className={`${styles.dayofmonth}`}>
            <div className={`${styles.row} ${styles.toprow}`}>
                {/* Display day of month */}
                <div className="date">
                    <p>{dateObject.getDate()}</p>
                </div>
            </div>
            {/* Display number of events user is part of for the day */}
            <div className={`${styles.row} ${styles.bottomrow}`}>
                {/* Add event to selected date */}
                <div className="add-event">
                    <button>+</button>
                </div>
                <p>{eventCount}</p>
            </div>
        </div>
    )
}