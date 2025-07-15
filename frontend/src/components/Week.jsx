//Display for weekly view, using DayOfWeek component to show each day in the shown week
import DayOfWeek from "./DayOfWeek"
import { populateWeekDates } from "@/utils/dateFunctions";

const weekdays = [1,2,3,4,5,6,7];

export default function Week ({ date }) {
    const dateObject = new Date(date);
    const weekDates = populateWeekDates(dateObject);

    return (
        <div>
            {
                weekdays.map((weekday, i) => <DayOfWeek key={weekday} date={weekDates[i].toDateString()} />)
            }
        </div>
    )
}