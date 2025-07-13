//env variables
const urlWithPort = `${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_PORT}`

export const editUser = async (details) => {
    const res = await fetch(`${urlWithPort}/api/account/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
    });
    return await res.json();
}