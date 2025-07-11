//Display for weekly view, using DayOfWeek component to show each day in the shown week
import DayOfWeek from "./DayOfWeek"

const weekdays = [1,2,3,4,5,6,7];

export default function Week () {

    return (
        <div>
            {
                weekdays.map(weekday => {
                    return (
                        <DayOfWeek key={weekday}/>
                    )
                })
            }
        </div>
    )
}