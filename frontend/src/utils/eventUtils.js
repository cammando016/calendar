const urlWithPort = `${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_PORT}`

//Compare component date and event date
export const matchDates = (date1, date2) => {
    //Date2 comes from event data
    const date2Object = new Date(date2);
    return (
        date1.getDate() === date2Object.getDate() &&
        date1.getMonth() === date2Object.getMonth() &&
        date1.getFullYear() === date2Object.getFullYear()
    );
}

//Create new event record in db
export const createEvent = async (details) => {
    const res = await fetch(`${urlWithPort}/api/events`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(details)
    });
    return await res.json();
}

//Submit event data to edit existing record
export const editEvent = async(details) => {
    const res = await fetch(`${urlWithPort}/api/events`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(details)
    });
    return await res.json();
}

//Get list of all events authenticated user is part of
export const fetchEvents = async(username) => {
    const res = await fetch(`${urlWithPort}/api/events?username=${encodeURIComponent(username)}`, {
        method: 'GET'
    });
    return await res.json();
}

export const deleteEvent = async(eventid) => {
    const res = await fetch(`${urlWithPort}/api/events`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(eventid)
    });
    return await res.json();
}