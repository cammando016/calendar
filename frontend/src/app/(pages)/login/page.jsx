"use client"
import { useState } from "react"
import { logUserIn } from "@/utils/authenticate"
import { useRouter } from "next/navigation"

export default function Page () {
    const [loginForm, setLoginForm] = useState({username: '', password: ''});
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const res = await logUserIn(loginForm);
        if (res.token) {
            localStorage.setItem('token', res.token);
            router.push('/protected');
        }
        else {
            alert (res.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input id='username' name='username' placeholder='Enter Your Username' onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} />
            <label htmlFor='password'>Password:</label>
            <input id='password' name='password' placeholder='Enter Your Password' onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
            <button type="submit">Login</button>
        </form>
    );
}