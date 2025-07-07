"use client"
import { useState } from "react";
import { useUser } from "@/context/UserContext"
import useLogin from "@/utils/useLogin";
import LoginForm from "@/forms/accountForms/LoginForm";

export default function Page() {
    const { user } = useUser();
    const [loginForm, setLoginForm] = useState({username: '', password: ''});
    const handleLogin = useLogin(loginForm, '/account');

    return (
        <>
            {
                user !== null ? (
                    <div id="acc-details-auth">
                        <p>First Name:</p>
                        <p>{user.firstname}</p>

                        <p>Username:</p>
                        <p>{user.username}</p>

                        <p>Birthday:</p>
                        <p>{user.birthdate}</p>

                        <p>Default View:</p>
                        <p>{user.defaultView}</p>

                        <p>Theme:</p>
                        <p>{user.theme}</p>

                        <p>Recovery Question:</p>
                        <p>{user.recoveryQuestion}</p>
                    </div>
                ) : (
                    <div id="acc-details-unauth">
                        <p>Please login to view account details</p>
                        <LoginForm form={loginForm} setForm={setLoginForm} submitFunction={handleLogin} />
                    </div>
                )
            }
        </>
    )
}