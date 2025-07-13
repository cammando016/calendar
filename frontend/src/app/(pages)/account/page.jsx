//Page displayed at /account. Display basic account details and link to options to update account details or change password
"use client"
import { useState } from "react";
import { useUser } from "@/context/UserContext"
import useLogin from "@/utils/useLogin";
import LoginForm from "@/forms/accountForms/LoginForm";
import Link from "next/link";
import DeleteAccountModal from "@/components/DeleteAccountModal";

export default function Page() {
    //Get current logged in user details
    const { user } = useUser();

    //Allow user to show delete account confirmation dialog modal if user clicks on 
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const openDeleteModal = () => setShowDeleteAccount(true);
    const closeDeleteModal = () => setShowDeleteAccount(false);

    //Allow login directly on account page if user isn't authenticated
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
                            <p>First Name: {user.firstname}</p>

                            <p>Username: {user.username}</p>

                            <p>Birthday: {user.birthdate}</p>

                            <p>Default View: {user.defaultView}</p>

                            <p>Theme: {user.theme}</p>

                            <p>Recovery Question: {user.recoveryQuestion}</p>

                            <p>Recovery Answer: {user.recoveryAnswer}</p>
                        </div>

                        <div id="account-updaters">
                            <Link key='edit-account-button' href='/account/edit' >
                                <button>Edit Account Details</button>
                            </Link>
                            <Link key='change-password-button' href='/account/reset-password'>
                                <button>Change Password</button>
                            </Link>
                            <button onClick={openDeleteModal}>Delete Account</button>
                        </div>

                        {/* Show delete account confirmation pop up if delete account button clicked */}
                        { showDeleteAccount && <DeleteAccountModal closeDelete={closeDeleteModal} /> }
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