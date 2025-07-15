//Used to display each day in the weekly view mode
import Event from "./Event"
import styles from '../styles/dayofweek.module.css'

export default function DayOfWeek({ date }) {
    const dateObject = new Date(date);
    return (
        <div className={`${styles.dayofweek}`}>
            {/* Show date of each day (Day Month Date) */}
            <div className="date">
                <h3>{date}<button>+</button></h3>
            </div>
            {/* Display list of events user is part of on each day */}
            <div className="events">
                <Event />
                <Event />
            </div>
        </div>
    )
}