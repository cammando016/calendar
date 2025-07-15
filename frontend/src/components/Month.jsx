//Display for a month, with each day of the month shown using DayOfMonth component
import DayOfMonth from "./DayOfMonth"
import styles from '../styles/month.module.css'

//used to map the individual day components in the month
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weekNums = [1, 2, 3, 4, 5, 6];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Month ({ date }) {
    const dateObject = new Date(date);
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
                        weekNums.map(weekNum => {
                            return (<tr key={weekNum}>
                                {
                                    weekdays.map(weekday => {
                                        return (
                                            <td key={`${weekNum}-${weekday}`} >
                                                <DayOfMonth
                                                    date={weekday.indexOf()+1}
                                                    eventCount={2}
                                                />
                                            </td>
                                        )
                                    })
                                }
                            </tr>)
                        })
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