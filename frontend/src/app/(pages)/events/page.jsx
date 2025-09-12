"use client"
import Link from "next/link"
import Image from "next/image"
import { useEventList } from '@/context/EventListContext'
import { useUser } from "@/context/UserContext"
import Event from "@/components/Event"
import { useEffect, useState } from "react";
import DeleteModal from "@/components/DeleteModal"
import { deleteEvent } from "@/utils/eventUtils"
import styles from '@/styles/event.module.css';
import sharedStyles from '@/styles/shared.module.css';
import theme from '@/styles/theme.module.css';
import Pagination from "@/components/Pagination"
import { incrementPage, decrementPage, firstPage, lastPage } from "@/utils/pagination"
import GroupFilter from "@/components/GroupFilter"
import { useGroupList } from "@/context/GroupListContext"

// Filter icon: <a href="https://www.flaticon.com/free-icons/preferences" title="preferences icons">Preferences icons created by apien - Flaticon</a>

export default function Page() {
    //Get context values to compare event creator and auth'd user
    const { eventList } = useEventList();
    const { user } = useUser();
    const { usersGroups } = useGroupList();

    // <----- STATE -----> 

    //Pagination State
    const [createdPageNum, setCreatedPageNum] = useState(0);
    const [invitedPageNum, setInvitedPageNum] = useState(0);
    //Delete modal open or closed
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    //Split events into created and invited State arrays
    const [createdEvents, setCreatedEvents] = useState(eventList.filter(evnt => (evnt.username === user?.username)));
    const [invitedEvents, setInvitedEvents] = useState(eventList.filter(evnt => (evnt.username !== user?.username)));
    //Used to control filter showing and group being filtered
    const [showFilter, setShowFilter] = useState(false);
    const [groupFilter, setGroupFilter] = useState('All');


    // <------ FUNCTIONS ----->
    
    const toggleFilter = () => setShowFilter(!showFilter);
    const hideFilter = () => setShowFilter(false);

    //Allow user to delete an event if they created it
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

    //Update active event id when edit button clicked on any rendered Event component, to pass that id into the url for editing events
    const setEventEdit = (clickedEvent) => setActiveEvent(clickedEvent)

    //State to track which event is display additional details
    const [activeEvent, setActiveEvent] = useState(null);
    const updateActiveEvent = (newEventId) => {
        if (newEventId === activeEvent) {
            setActiveEvent(null);
        } else {
            setActiveEvent(newEventId);
        }
    }

    useEffect(() => {
        if (!user) return;

        const filteredEvents = groupFilter === 'All' ? eventList : eventList.filter(evt => evt.eventgroupid === groupFilter);

        setCreatedEvents(filteredEvents.filter(evnt => (evnt.username === user.username)));
        setInvitedEvents(filteredEvents.filter(evnt => (evnt.username !== user.username)));
    }, [groupFilter, eventList, user]);

    const userTheme = user?.theme || 'green';

    // Return skeleton loading page if user does not exist
    if (!user) {
        return (
            <div className={sharedStyles.skeletonContainer}>
                <p>Loading Events...</p>
            </div>
        )
    }

    return (
        <div>
            <div className={`${sharedStyles.rowflex} ${sharedStyles.sectionheading}`}>
                <h3 style={{marginBottom: '0'}}>Events</h3>
                <div className={sharedStyles.rowflex}>
                    <p style={{margin: '0', padding: '5px'}}>
                        {
                            groupFilter === 'All' ?
                            'All' :
                            usersGroups.find(group => group.groupid === groupFilter)?.groupname
                        }
                    </p>
                    <button type='button' onClick={toggleFilter} style={{padding: '0', alignSelf: 'flex-end'}} className={`${sharedStyles.logoutbtn} ${showFilter && styles.filteractive}`}>
                        <Image 
                            src='/options.png'
                            alt='filter icon'
                            width={25}
                            height={25}
                        />
                    </button>
                </div>
            </div>
            {
                showFilter && <div className={`${styles.groupfilter} ${styles.filteractive}`}> <GroupFilter groupList={usersGroups} filter={groupFilter} setFilter={setGroupFilter} hideFilter={hideFilter} /> </div>
            }
            <div className={sharedStyles.overflow}>
                <div id="event-list-user-created">
                    <div className={`${sharedStyles.rowflex} ${sharedStyles.sectionheading}`}>
                        <h4>Created Events</h4>
                        <Link href='/events/create'><button type='button' className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`}>Create Event</button></Link>
                    </div>
                    {
                        createdEvents.slice(createdPageNum * 3, (createdPageNum + 1) * 3).map(evt => {
                            return <Event key={evt.eventid} eventRecord={evt} updateEvent={updateActiveEvent} setEdit={setEventEdit} activeEvent={activeEvent} deleteEvent={handleDelete} userCreated={true} />
                        })
                    }
                    <Pagination currentPage={createdPageNum + 1} pageCount={Math.ceil(createdEvents.length/3)} increment={incrementPage} decrement={decrementPage} firstPage={firstPage} lastPage={lastPage} pageState={createdPageNum} stateSetter={setCreatedPageNum} />
                </div>
                <div id="event-list-user-added">
                    <h4 className={sharedStyles.sectionheading}>Invited Events</h4>
                    {
                        invitedEvents.slice(invitedPageNum * 3, (invitedPageNum + 1) * 3).map(evt => {
                            return <Event key={evt.eventid} eventRecord={evt} updateEvent={updateActiveEvent} activeEvent={activeEvent} userCreated={false} />
                        })
                    }
                    <Pagination currentPage={invitedPageNum + 1} pageCount={Math.ceil(invitedEvents.length/3)} increment={incrementPage} decrement={decrementPage} firstPage={firstPage} lastPage={lastPage} pageState={invitedPageNum} stateSetter={setInvitedPageNum} />
                </div>
            </div>
                
            { showDeleteAccount && <DeleteModal closeDelete={closeDeleteModal} handleDelete={confirmDelete} deleteMessage={deleteMessage} /> }
        </div>
    )
}