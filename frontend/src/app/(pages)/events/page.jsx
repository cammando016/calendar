"use client"
import Link from "next/link"
import { useEventList } from '@/context/EventListContext'
import { useUser } from "@/context/UserContext"
import Event from "@/components/Event"
import { useState } from "react";
import DeleteModal from "@/components/DeleteModal"
import { deleteEvent } from "@/utils/eventUtils"
import sharedStyles from '@/styles/shared.module.css';

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

    //Update active event id when edit button clicked on any rendered Event component, to pass that id into the url for editing events
    const setEventEdit = (clickedEvent) => setActiveEvent(clickedEvent)

    //Allow user to delete an event if they created it
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const openDeleteModal = () => setShowDeleteAccount(true);
    const closeDeleteModal = () => setShowDeleteAccount(false);
    const deleteMessage = 'Are you sure you want to delete this event?';

    //Open modal for event deletion for selected event.
    //Managing delete modal from page instead of event component to keep Event server side
    const handleDelete = (eventid) => {
        setActiveEvent(eventid)
        openDeleteModal();
    }

    const confirmDelete = async () => {
        const res = await deleteEvent({eventId: activeEvent});
        if (res.message) {
            alert('Event Deleted');
        }
        closeDeleteModal();
    }

    return (
        <div>
            <h3 className={sharedStyles.pageheading}>Events</h3>
            <div id="event-list-user-created">
                <div className={`${sharedStyles.rowflex} ${sharedStyles.sectionheading}`}>
                    <h4>Created Events</h4>
                    <Link href='/events/create'><button type='button' className={`${sharedStyles.btn} ${sharedStyles.medbtn}`}>Create Event</button></Link>
                </div>
                {
                    eventList.filter(evnt => (evnt.username === user.username)).map(evt => {
                        return <Event key={evt.eventid} eventRecord={evt} updateEvent={updateActiveEvent} setEdit={setEventEdit} activeEvent={activeEvent} deleteEvent={handleDelete} userCreated={true} />
                    })
                }
            </div>
            <div id="event-list-user-added">
                <h4>Invited Events</h4>
                {
                    eventList.filter(evnt => (evnt.username !== user.username)).map(evt => {
                        return <Event key={evt.eventid} eventRecord={evt} updateEvent={updateActiveEvent} activeEvent={activeEvent} userCreated={false} />
                    })
                }
            </div>
                
            { showDeleteAccount && <DeleteModal closeDelete={closeDeleteModal} handleDelete={confirmDelete} deleteMessage={deleteMessage} /> }
        </div>
    )
}