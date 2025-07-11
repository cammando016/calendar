//Login page, displayed at /login

"use client"
import { useState } from "react"
import useLogin from "@/utils/useLogin"
import LoginForm from "@/forms/accountForms/LoginForm";

export default function Page () {
    //State object to store form inputs to check user credentials with DB
    const [loginForm, setLoginForm] = useState({username: '', password: ''});
    //Login form submit function, routes user to home page (/) on successful authentication
    const handleLogin = useLogin(loginForm, '/');

    //Use login form component to collect user credentials and attempt authentication
    return <LoginForm form={loginForm} setForm={setLoginForm} submitFunction={handleLogin} />;
}