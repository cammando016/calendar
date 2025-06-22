import styles from '../styles/dayofmonth.module.css'

export default function DayOfMonth({ date, eventCount }) {

    return (
        <div className={`${styles.dayofmonth}`}>
            <div className={`${styles.row} ${styles.toprow}`}>
                <div className="date">
                    <p>{date}</p>
                </div>
                <div className="add-event">
                    <button>+</button>
                </div>
            </div>
            <div className={`${styles.row} ${styles.bottomrow}`}>
                <p>x{eventCount}</p>
            </div>
        </div>
    )
}