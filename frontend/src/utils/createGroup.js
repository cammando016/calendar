const urlWithPort = `${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_PORT}`

//Backend connection to save new db record to groups table
export const createGroup = async (details) => {
    const res = await fetch(`${urlWithPort}/api/groups`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(details)
    });
    return await res.json();
}

export const getUsersGroups = async (username) => {
    const res = await fetch(`${urlWithPort}/api/groups?username=${encodeURIComponent(username)}`, {
        method: 'GET'
    });
    return await res.json();
};

export const editGroup = async (details) => {
    const res = await fetch(`${urlWithPort}/api/groups`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(details)
    });
    return await res.json();
}

export const deleteGroup = async (groupId) => {
    const res = await fetch(`${urlWithPort}/api/groups`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(groupId)
    });
    return await res.json();
}