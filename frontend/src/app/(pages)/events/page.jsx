"use client"
import Link from "next/link"
import { useEventList } from '@/context/EventListContext'
import sharedStyles from '@/styles/shared.module.css'

export default function Page() {
    const { eventList } = useEventList();
    return (
        <div>
            <h3>Event Page</h3>
            <div id="event-list">
                {
                    eventList.map(evt => {
                        return (
                            <div key={evt.eventid} id="event" className={sharedStyles.rowflex}>
                                <p>Name: {evt.eventname}</p>
                                <p>Date: {evt.eventstartdate}</p>
                            </div>
                        )
                    })
                }
            </div>
            <Link href='/events/create'><button>Create Event</button></Link>
        </div>
    )
}