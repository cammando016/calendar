import styles from '../styles/monthofyear.module.css';

export default function MonthOfYear ({ monthName, eventCount }) {
    return (
        <div className={`${styles.monthofyear}`}>
            <h3>{monthName}</h3>
            <p>{eventCount}</p>
        </div>
    )
}