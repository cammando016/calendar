//Used to display each day in the weekly view mode
import Event from "./Event";
import styles from '../styles/week.module.css';
import sharedStyles from '../styles/shared.module.css';
import theme from '../styles/theme.module.css';
import { useUser } from "@/context/UserContext";
import { useEventList } from "@/context/EventListContext";
import { matchDates } from "@/utils/eventUtils";
import Link from "next/link";

export default function DayOfWeek({ date }) {
    const dateObject = new Date(date);
    const { user } = useUser()
    const { eventList } = useEventList();
    const dayEvents = eventList.filter(evt => matchDates(dateObject, evt.eventstarttime.slice(0, 10)));
    return (
        <div className={`${sharedStyles.rowflex} ${styles.weekday} ${sharedStyles.cardborder} ${user ? theme[`card${user.theme}`] : theme.cardgreen} ${sharedStyles.cardcolour}`}>
            {/* Show date of each day (Day Month Date) */}
            <div className={`${sharedStyles.colflex} ${styles.weekdate}`}>
                <h4 className={styles.weekheading}>{date}</h4>
                <Link href={`/events/create/${date}`}><button type="button" className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`}>Create Event</button></Link>
            </div>
            {/* Display list of events user is part of on each day */}
            <div className={`${styles.weekdate} ${styles.eventlist}`}>
                {
                    dayEvents.map(dayEvent => {
                        return <Event key={dayEvent.eventid} eventRecord={dayEvent} hideToggle={true} />
                    })
                }
            </div>
        </div>
    )
}