//env variables
const urlWithPort = `${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_PORT}`

//Backend connection to check if submitted username/password matches user details in db
export const logUserIn = async (credentials) => {
    const res = await fetch(`${urlWithPort}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem('token', data.token);
        return {
            user: data.user,
            token: data.token
        };
    }
    else {
        throw new Error(data.error);
    }
};

//Backend connection to post account details to DB on successful signup
export const userSignup = async (details) => {
    const res = await fetch(`${urlWithPort}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
    });
    return await res.json();
};

export const getAccountRecovery = async (username) => {
    const res = await fetch(`${urlWithPort}/api/auth/recover?username=${encodeURIComponent(username)}`, {
        method: 'GET'
    });
    return await res.json();
};