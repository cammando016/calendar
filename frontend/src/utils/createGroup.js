const urlWithPort = `${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_PORT}`

export const createGroup = async (details) => {
    const res = await fetch(`${urlWithPort}/api/groups`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(details)
    });
    return await res.json();
}