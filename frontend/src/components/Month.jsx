//Display for a month, with each day of the month shown using DayOfMonth component
import DayOfMonth from "./DayOfMonth";
import styles from '../styles/month.module.css';
import sharedStyles from '../styles/shared.module.css';
import theme from '../styles/theme.module.css';
import { populateMonthDates } from "@/utils/dateFunctions";
import { useDate } from "@/context/DateContext";
import { useEventList } from "@/context/EventListContext";
import { useUser } from "@/context/UserContext";
import Event from "./Event";

//used to map the individual day components in the month
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Month ({ date }) {
    const { user } = useUser();
    const { eventList } = useEventList();
    //Convert date prop from string to date object
    const dateObject = new Date(date);
    //Fill array of dates to display for month on screen (including sun - sat weekday overflow to past and next month)
    const monthDates = populateMonthDates(dateObject);
    const numWeeks = monthDates.length / 7;

    const { incrementYear, decrementYear, incrementMonth, decrementMonth, resetDate } = useDate();
    
    return (
        <div className={`${styles.month}`}>
            <div className={`${styles.monthheading} ${sharedStyles.colflex}`}>
                {/* Move between previous/subsequent months */}
                <h3>{date}</h3>
                <p className={styles.calendarnav}>
                    <button className={`${sharedStyles.medbtn} ${sharedStyles.btn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`} onClick={decrementYear}>{`<- Year`}</button>
                    <button className={`${sharedStyles.medbtn} ${sharedStyles.btn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`} onClick={decrementMonth}>{`<- Month`}</button>
                    <button className={`${sharedStyles.medbtn} ${sharedStyles.btn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`} onClick={resetDate}>Today</button>
                    <button className={`${sharedStyles.medbtn} ${sharedStyles.btn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`} onClick={incrementMonth}>{`Month ->`}</button>
                    <button className={`${sharedStyles.medbtn} ${sharedStyles.btn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`} onClick={incrementYear}>{`Year ->`}</button>
                </p>
            </div>
            <table>
                <thead>
                    {/* Weekday headings */}
                    <tr>
                        {
                            weekdays.map(weekday => {
                                return <th key={weekday} className={`${styles.weekdayheading}`}>{weekday}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {/* Day components */}
                    {
                        Array.from({ length: numWeeks }).map((_, weekNum) => (
                            <tr key={`week-${weekNum}`}>
                                {
                                    Array.from({ length: 7 }).map((_, weekDay) => {
                                        const dayDate = monthDates[weekNum * 7 + weekDay];
                                        return (
                                            <td key={dayDate.toDateString().slice(0,15)}>
                                                <DayOfMonth inCurrentMonth={dateObject.getMonth() === dayDate.getMonth() ? true : false} date={dayDate.toDateString().slice(0,15)} />
                                            </td>
                                        )
                                    }
                                )}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* List of events in the current month */}
            <div>
                <h4 className={sharedStyles.sectionheading}>Events</h4>
                <div className={`${sharedStyles.rowflex} ${styles.eventlist}`}>
                    {
                        eventList.filter(listEvent => ((new Date(listEvent.eventstarttime.slice(0,10))).getMonth() === dateObject.getMonth()) && (new Date(listEvent.eventstarttime.slice(0,10)).getFullYear() === dateObject.getFullYear())).map(filteredEvent => {
                            return <Event key={filteredEvent.eventid} eventRecord={filteredEvent} hideToggle={true} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}