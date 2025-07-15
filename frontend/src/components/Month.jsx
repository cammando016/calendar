//Display for a month, with each day of the month shown using DayOfMonth component
import DayOfMonth from "./DayOfMonth"
import styles from '../styles/month.module.css'
import { populateMonthDates } from "@/utils/dateFunctions";

//used to map the individual day components in the month
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Month ({ date }) {
    //Convert date prop from string to date object
    const dateObject = new Date(date);
    //Fill array of dates to display for month of screen (including sun - sat weekday overflow to past and next month)
    const monthDates = populateMonthDates(dateObject);
    const numWeeks = monthDates.length / 7;
    
    return (
        <div className={`${styles.month}`}>
            <div className={`${styles.monthheading}`}>
                {/* Move between previous/subsequent months */}
                <h3>
                    <button>{`<- Year`}</button>
                    <button>{`<- Month`}</button>
                        {date}
                    <button>{`Month ->`}</button>
                    <button>{`Year ->`}</button>
                </h3>
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
                                            <td key={dayDate.toISOString().slice(0,10)}>
                                                <DayOfMonth date={dayDate.toISOString().slice(0,10)} />
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
                <h3>Events</h3>
            </div>
        </div>
    )
}