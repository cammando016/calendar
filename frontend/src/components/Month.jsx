//Display for a month, with each day of the month shown using DayOfMonth component
import DayOfMonth from "./DayOfMonth"
import styles from '../styles/month.module.css'

//used to map the individual day components in the month
const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const weekNums = [1, 2, 3, 4, 5];

export default function Month ({ month }) {
    return (
        <div className={`${styles.month}`}>
            <div className={`${styles.monthheading}`}>
                {/* Move between previous/subsequent months */}
                <h3>
                    <button>prev</button>
                    {month}
                    <button>next</button>
                </h3>
            </div>
            <table>
                <thead>
                    {/* Weekday headings */}
                    <tr>
                        {
                            weekdays.map(weekday => {
                                return <th className={`${styles.weekdayheading}`}>{weekday}</th>
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
                                            <td>
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
                <h3>{month} Events</h3>
            </div>
        </div>
    )
}