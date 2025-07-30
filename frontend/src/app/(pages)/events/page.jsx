"use client"
import Link from "next/link"
import { useEventList } from '@/context/EventListContext'
import { useUser } from "@/context/UserContext"
import Event from "@/components/Event"
import { useState } from "react";

export default function Page() {
    //Get context values to compare event creator and auth'd user
    const { eventList } = useEventList();
    const { user } = useUser();

    //State to track which event is display additional details
    const [activeEvent, setActiveEvent] = useState(null);
    const updateActiveEvent = (newEventId) => {
        if (newEventId === activeEvent) {
            setActiveEvent(null);
        } else {
            setActiveEvent(newEventId)
        }
    }

    const setEventEdit = (clickedEvent) => setActiveEvent(clickedEvent)

    return (
        <div>
            <h3>Event Page</h3>
            <div id="event-list-user-created">
                <p>Created Events</p>
                {
                    eventList.filter(evnt => (evnt.username === user.username)).map(evt => {
                        return <Event key={evt.eventid} eventRecord={evt} updateEvent={updateActiveEvent} setEdit={setEventEdit} activeEvent={activeEvent} />
                    })
                }
            </div>
            <div id="event-list-user-added">
                <p>Invited Events</p>
                {
                    
                    eventList.filter(evnt => (evnt.username !== user.username)).map(evt => {
                        return <Event key={evt.eventid} eventRecord={evt} updateEvent={updateActiveEvent} setEdit={setEventEdit} activeEvent={activeEvent} />
                    })
                }
            </div>
            <Link href='/events/create'><button>Create Event</button></Link>
        </div>
    )
}