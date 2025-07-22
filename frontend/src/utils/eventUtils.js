const urlWithPort = `${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_PORT}`

//Create new event record in db
export const createEvent = async (details) => {
    const res = await fetch(`${urlWithPort}/api/events`, {
        method: 'POST',
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