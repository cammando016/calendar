import { useState, useEffect, useContext, createContext } from "react";
import { useUser } from './UserContext'
import { fetchEvents } from "@/utils/eventUtils";

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
                setEventList(res.eventList);
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