//env variables
const urlWithPort = `${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_PORT}`

export const logUserIn = async (credentials) => {
    const res = await fetch(`${urlWithPort}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    return await res.json();
};

export const userSignup = async (details) => {
    const res = await fetch(`${urlWithPort}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
    });
    console.log(urlWithPort);
    return await res.json();
};