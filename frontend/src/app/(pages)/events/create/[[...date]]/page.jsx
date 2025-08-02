"use client"
import React, { useState, useMemo } from 'react';
import { useGroupList } from '@/context/GroupListContext';
import AddEventForm from '@/forms/AddEventForm';
import { createEvent } from '@/utils/eventUtils'; 
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEventList } from '@/context/EventListContext';

function formatDateInput(date) {
    if (!date) {
        return '';
    }
    return date.toISOString().slice(0, -1);
}

export default function Page ({ params }) {
    //If there is anything in URL after /events/create, decode param "date" into date object
    const resolvedParams = React.use(params);
    const resolvedDate = useMemo(() => {
        if(!resolvedParams?.date || resolvedParams.date.length === 0) {
            return null;
        }
        try {
            const decodedDate = decodeURIComponent(resolvedParams.date[0]);
            return new Date(decodedDate);
        } catch {
            return null;
        }
    }, [params]);

    const eventStartDate = resolvedDate ? new Date(resolvedDate.getTime() + (12 - resolvedDate.getTimezoneOffset() / 60) * 60 * 60 * 1000) : null;
    const eventEndDate = resolvedDate ? new Date(resolvedDate.getTime() + (13 - resolvedDate.getTimezoneOffset() / 60) * 60 * 60 * 1000) : null;

    const { usersGroups } = useGroupList();
    const { user } = useUser();
    
    const router = useRouter();
    const { fetchUserEvents } = useEventList();

    //State object to store form entries in
    const [eventForm, setEventForm] = useState({
        eventName: '',
        eventType: 'activity',
        eventNotes: '',
        eventInvited: usersGroups[0].groupid,
        eventStart: formatDateInput(eventStartDate),
        eventEnd: formatDateInput(eventEndDate)
    })

    //Submit form entries to DB to create new event
    const handleSubmit = async (e) => {
        e.preventDefault();
        const submissionDetails = {...eventForm, eventCreator: user.username}
        const res = await createEvent(submissionDetails);
        if (res.message) {
            await fetchUserEvents();
            router.push('/events');
        } else {
            console.log('error');
        }
        alert('Submit Simulated!');
    }

    return (
        <div>
            <h3>Create Event</h3>
            <AddEventForm groupList={usersGroups} form={eventForm} setForm={setEventForm} submitFunc={handleSubmit} />
        </div>
    )
}