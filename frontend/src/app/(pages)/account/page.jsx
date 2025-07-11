//Page displayed at /account. Display basic account details and link to options to update account details or change password

"use client"
import { useState } from "react";
import { useUser } from "@/context/UserContext"
import useLogin from "@/utils/useLogin";
import LoginForm from "@/forms/accountForms/LoginForm";

export default function Page() {
    //Get current logged in user details
    const { user } = useUser();

    const [loginForm, setLoginForm] = useState({username: '', password: ''});
    const handleLogin = useLogin(loginForm, '/account');

    return (
        <>
            {
                //Check if a user is authenticated to render relevant page content
                user !== null ? (
                    //Display user account details if authenticated
                    <div id="acc-details-auth">
                        <div id="account-details">
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

                        <div id="account-updaters">
                            <button>Edit Account Details</button>
                            <button>Change Password</button>
                        </div>
                    </div>
                ) : (
                    //Display login form if user is not authenticated
                    <div id="acc-details-unauth">
                        <p>Please login to view account details</p>
                        <LoginForm form={loginForm} setForm={setLoginForm} submitFunction={handleLogin} />
                    </div>
                )
            }
        </>
    )
}