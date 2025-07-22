"use client"
import Link from "next/link"
import { useEventList } from '@/context/EventListContext'
import Event from "@/components/Event"

export default function Page() {
    const { eventList } = useEventList();
    return (
        <div>
            <h3>Event Page</h3>
            <div id="event-list">
                {
                    eventList.map(evt => {
                        return <Event key={evt.eventid} eventRecord={evt}/>
                    })
                }
            </div>
            <Link href='/events/create'><button>Create Event</button></Link>
        </div>
    )
}