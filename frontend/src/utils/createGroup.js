const urlWithPort = `${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_PORT}`

//Backend connection to save new db record to groups table
export const createGroup = async (details) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/groups`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(details)
    });
    return await res.json();
}

export const getUsersGroups = async (username) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/groups?username=${encodeURIComponent(username)}`, {
        method: 'GET'
    });
    return await res.json();
};

export const editGroup = async (details) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/groups`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(details)
    });
    return await res.json();
}

export const deleteGroup = async (groupId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/groups`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(groupId)
    });
    return await res.json();
}

export const compareMemberArrays = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    if (set1.size !== set2.size) {
        return false;
    }

    for (const value of set1) {
        if (!set2.has(value)) {
            return false;
        }
    }
    
    return true;
}