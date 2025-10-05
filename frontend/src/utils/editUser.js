//env variables
const urlWithPort = `${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_PORT}`

export const editUser = async (details) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/account/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
    });
    return await res.json();
}

export const deleteUser = async (details) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/account/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
    });
    return await res.json();
}

export const changePassword = async (details) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/account/reset-password`, {
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
    });
    return await res.json();
}