//Used to display each day in the weekly view mode
import Event from "./Event";
import styles from '../styles/dayofweek.module.css';
import sharedStyles from '../styles/shared.module.css';
import { useEventList } from "@/context/EventListContext";
import { matchDates } from "@/utils/eventUtils";
import Link from "next/link";

export default function DayOfWeek({ date }) {
    const dateObject = new Date(date);
    const { eventList } = useEventList();
    const dayEvents = eventList.filter(evt => matchDates(dateObject, evt.eventstarttime.slice(0, 10)));
    return (
        <div className={`${styles.dayofweek}`}>
            {/* Show date of each day (Day Month Date) */}
            <div className={sharedStyles.rowflex}>
                <h3>{date}</h3>
                <Link href={`/events/create/${date}`}><button>+</button></Link>
            </div>
            {/* Display list of events user is part of on each day */}
            <div className="events">
                {
                    dayEvents.map(dayEvent => {
                        return <Event key={dayEvent.eventid} eventRecord={dayEvent} />
                    })
                }
            </div>
        </div>
    )
}