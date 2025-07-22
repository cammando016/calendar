"use client"
import { useState } from 'react';
import { useGroupList } from '@/context/GroupListContext';
import AddEventForm from '@/forms/AddEventForm';
import { createEvent } from '@/utils/eventUtils'; 
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEventList } from '@/context/EventListContext';

export default function Page () {
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
        eventStart: '',
        eventEnd: ''
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
            <div>
                {
                    
                }
            </div>
            <AddEventForm groupList={usersGroups} form={eventForm} setForm={setEventForm} submitFunc={handleSubmit} />
        </div>
    )
}