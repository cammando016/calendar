import { useState, useEffect, useContext, createContext } from "react";
import { useUser } from './UserContext'
import { fetchEvents } from "@/utils/eventUtils";
import { adjustTz } from "@/utils/dateFunctions";

const EventListContext = createContext();

export const EventListProvider = ({ children }) => {
    const [eventList, setEventList] = useState([]);
    const { user } = useUser();

    const fetchUserEvents = async () => {
        try {
            if (!user){
                setEventList([]);
                return;
            }
            const res = await fetchEvents(user.username);
            if (res.eventList) {
                const timezoneFixedEvents = res.eventList.map(evnt => ({
                    ...evnt,
                    eventstarttime: adjustTz(evnt.eventstarttime).toISOString(),
                    eventendtime: adjustTz(evnt.eventendtime).toISOString(),
                    displaydate: adjustTz(evnt.displaydate).toISOString()
                }));
                setEventList(timezoneFixedEvents);
            } else {
                throw new Error ({message: 'Error fetching events'});
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    }

    useEffect(() => { fetchUserEvents(); }, [user])

    return <EventListContext.Provider value={{ eventList, fetchUserEvents }}>{children}</EventListContext.Provider>
}

export const useEventList = () => useContext(EventListContext);