"use client"
import { useState } from "react"
import { logUserIn } from "@/utils/authenticate"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"

export default function Page () {
    const [loginForm, setLoginForm] = useState({username: '', password: ''});
    const router = useRouter();
    const { updateUser } = useUser();

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const res = await logUserIn(loginForm);
            localStorage.setItem('token', res.token);
            updateUser(res.user);
            router.push('/');
        }
        catch (error) {
            alert (error.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor='username'>Username:</label>
            <input id='username' name='username' placeholder='Enter Your Username' onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} />
            <label htmlFor='password'>Password:</label>
            <input id='password' name='password' placeholder='Enter Your Password' onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
            <button type="submit">Login</button>
        </form>
    );
}