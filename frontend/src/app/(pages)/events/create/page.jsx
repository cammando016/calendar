"use client"
import { useState } from 'react';
import { useGroupList } from '@/context/GroupListContext';
import AddEventForm from '@/forms/AddEventForm';

export default function Page () {
    const { usersGroups } = useGroupList();
    const [eventForm, setEventForm] = useState({
        eventName: '',
        eventType: 'activity',
        eventNotes: '',
        eventInvited: usersGroups[0].groupid,
        eventStart: '',
        eventEnd: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(eventForm);
        alert('Submit Simulated!');
    }

    return (
        <div>
            <h3>Create Event</h3>
            <AddEventForm groupList={usersGroups} form={eventForm} setForm={setEventForm} submitFunc={handleSubmit} />
        </div>
    )
}