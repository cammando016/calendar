"use client"
import { useEventList } from "@/context/EventListContext";
import React, { useState } from "react";
import AddEventForm from "@/forms/AddEventForm";
import { editEvent } from "@/utils/eventUtils";
import { useRouter } from "next/navigation";

export default function Page ({ params }) {
    const router = useRouter();
    const { eventList } = useEventList();
    const resolvedParams = React.use(params);
    const currentEvent = eventList[eventList.findIndex(evt => evt.eventid === resolvedParams.eventid)];

    //Initial values from event to compare for changes
    const initialValues =  {
        eventName: currentEvent.eventname,
        eventType: currentEvent.eventtype,
        eventNotes: currentEvent.eventnotes,
        eventStart: currentEvent.eventstarttime,
        eventEnd: currentEvent.eventendtime
    };
    
    //State object to store form entries in
    const [eventForm, setEventForm] = useState({
        eventName: currentEvent.eventname,
        eventType: currentEvent.eventtype,
        eventNotes: currentEvent.eventnotes,
        eventStart: currentEvent.eventstarttime.slice(0, -1),
        eventEnd: currentEvent.eventendtime.slice(0, -1)
    })

    const handleSubmit = async () => {
        const submission = {...eventForm, eventId: currentEvent.eventid}
        const res = await editEvent(submission);
        if (res.message) {
            alert('Event edited successfully');
        } else {
            alert(res.error);
        }
        router.push('/events');
    }

    return <AddEventForm form={eventForm} setForm={setEventForm} submitFunc={handleSubmit} edit={true} />
}