//Display for weekly view, using DayOfWeek component to show each day in the shown week
import DayOfWeek from "./DayOfWeek"
import { populateWeekDates } from "@/utils/dateFunctions";
import { useDate } from "@/context/DateContext";
import sharedStyles from '../styles/shared.module.css';
import styles from '../styles/week.module.css';
import theme from '../styles/theme.module.css';
import { useUser } from "@/context/UserContext";

const weekdays = [1,2,3,4,5,6,7];

export default function Week ({ date }) {
    const dateObject = new Date(date);
    const weekDates = populateWeekDates(dateObject);

    const { user } = useUser();
    const { incrementWeek, decrementWeek, resetDate } = useDate();

    return (
        <div className={styles.week}>
            <div className={`${sharedStyles.rowflex} ${styles.weeknav}`}>
                <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`} onClick={decrementWeek}>{`<- Week`}</button>
                <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`} onClick={resetDate}>Today</button>
                <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`} onClick={incrementWeek}>{`Week ->`}</button>
            </div>
            <div className={styles.weekdays}>
                {
                    weekdays.map((weekday, i) => <DayOfWeek key={weekday} date={weekDates[i].toDateString()} />)
                }
            </div>
        </div>
    )
}