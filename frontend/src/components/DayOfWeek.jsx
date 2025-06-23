import Event from "./Event"
import styles from '../styles/dayofweek.module.css'

export default function DayOfWeek() {

    return (
        <div className={`${styles.dayofweek}`}>
            <div className="date">
                <h3>Friday June 20 <button>+</button></h3>
            </div>
            <div className="events">
                <Event />
                <Event />
            </div>
        </div>
    )
}