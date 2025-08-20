//Display for weekly view, using DayOfWeek component to show each day in the shown week
import DayOfWeek from "./DayOfWeek"
import { populateWeekDates } from "@/utils/dateFunctions";
import { useDate } from "@/context/DateContext";

const weekdays = [1,2,3,4,5,6,7];

export default function Week ({ date }) {
    const dateObject = new Date(date);
    const weekDates = populateWeekDates(dateObject);

    const { incrementWeek, decrementWeek, resetDate } = useDate();

    return (
        <div>
            <p>
                <button onClick={decrementWeek}>{`<- Week`}</button>
                <button onClick={resetDate}>Today</button>
                <button onClick={incrementWeek}>{`Week ->`}</button>
            </p>
            {
                weekdays.map((weekday, i) => <DayOfWeek key={weekday} date={weekDates[i].toDateString()} />)
            }
        </div>
    )
}