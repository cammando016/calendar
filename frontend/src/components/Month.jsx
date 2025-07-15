//Display for a month, with each day of the month shown using DayOfMonth component
import DayOfMonth from "./DayOfMonth"
import styles from '../styles/month.module.css'
import { getDaysOfMonth, getWeekdayOfFirst, populateMonthWeekdays } from "@/utils/dateFunctions";

//used to map the individual day components in the month
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Month ({ date }) {
    //Convert date prop from string to date object
    const dateObject = new Date(date);
    //Fill array of dates to display for month of screen (including sun - sat weekday overflow to past and next month)
    const monthDates = populateMonthWeekdays(dateObject);
    const numWeeks = [];
    let weekIterator = 0;
    for(let i = 0; i < monthDates.length; i += 7) {
        numWeeks[weekIterator] = weekIterator;
        weekIterator++;
    }
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
                        numWeeks.map((numWeek, i) => {
                            return (
                                <tr key={`Weeknumber: ${i}`}>
                                    {
                                        weekdays.map((weekday, j) => {
                                            {console.log(i, j)}
                                            return (
                                                <td key={`Week Number ${j}:${weekday}`}>
                                                   <DayOfMonth date={monthDates[(i*7) + j]} /> 
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                        // weekNums.map(weekNum => {
                        //     return (<tr key={weekNum}>
                        //         {
                        //             weekdays.map(weekday => {
                        //                 return (
                        //                     <td key={`${weekNum}-${weekday}`} >
                        //                         <DayOfMonth
                        //                             date={weekday.indexOf()+1}
                        //                             eventCount={2}
                        //                         />
                        //                     </td>
                        //                 )
                        //             })
                        //         }
                        //     </tr>)
                        // })
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