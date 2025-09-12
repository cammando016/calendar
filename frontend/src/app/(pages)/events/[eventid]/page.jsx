"use client"
import { useEventList } from "@/context/EventListContext";
import React, { useEffect, useState } from "react";
import AddEventForm from "@/forms/AddEventForm";
import { editEvent } from "@/utils/eventUtils";
import { useRouter } from "next/navigation";

export default function Page ({ params }) {
    const router = useRouter();
    const { eventList } = useEventList();
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [loading, setLoading] = useState(true);
    const [eventForm, setEventForm] = useState(null);

    const resolvedParams = React.use(params);
    const resolvedEventId = resolvedParams.eventid;
    const currentEvent = eventList?.find(evt => evt.eventid === resolvedEventId);

    useEffect(() => {
        if(currentEvent) {
            setEventForm({
                eventName: currentEvent.eventname || '',
                eventType: currentEvent.eventtype || '',
                eventNotes: currentEvent.eventnotes || '',
                eventStart: currentEvent.eventstarttime ? currentEvent.eventstarttime.slice(0, -1) : '',
                eventEnd: currentEvent.eventendtime ? currentEvent.eventendtime.slice(0, -1) : ''
            })

            setLoading(false);
        }
    }, [currentEvent]);

    //Prevent submitting edit if nothing has changed
    useEffect(() => {
        if (!eventForm || !currentEvent) {
            setSubmitDisabled(true);
            return;
        }

        setSubmitDisabled(
            eventForm.eventname === currentEvent.eventname &&
            eventForm.eventType === currentEvent.eventtype &&
            eventForm.eventnotes === currentEvent.eventnotes &&
            eventForm.eventStart === currentEvent.eventstarttime.slice(0, -1) &&
            eventForm.eventEnd === currentEvent.eventendtime.slice(0, -1)
        )
    }, [eventForm, currentEvent])

    const handleSubmit = async () => {
        if (!currentEvent) {
            return;
        }
        const submission = {...eventForm, eventId: currentEvent.eventid}
        const res = await editEvent(submission);
        if (res.message) {
            alert('Event edited successfully');
        } else {
            alert(res.error);
        }
        router.push('/events');
    }

    if (!currentEvent || loading || !eventForm) {
        return (
            <div>
                <p>Loading event details</p>
            </div>
        )
    }

    return <AddEventForm form={eventForm} setForm={setEventForm} submitFunc={handleSubmit} edit={true} submitDisabled={submitDisabled}/> 
}