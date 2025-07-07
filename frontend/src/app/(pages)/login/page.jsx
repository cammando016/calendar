"use client"
import { useState } from "react"
import useLogin from "@/utils/useLogin"
import LoginForm from "@/forms/accountForms/LoginForm";

export default function Page () {
    const [loginForm, setLoginForm] = useState({username: '', password: ''});
    const handleLogin = useLogin(loginForm, '/');

    return <LoginForm form={loginForm} setForm={setLoginForm} submitFunction={handleLogin} />;
}