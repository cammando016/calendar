//Page displayed at /account. Display basic account details and link to options to update account details or change password
"use client"
import { useState } from "react";
import { useUser } from "@/context/UserContext"
import { deleteUser } from "@/utils/editUser";
import { useRouter } from "next/navigation";
import useLogin from "@/utils/useLogin";
import LoginForm from "@/forms/accountForms/LoginForm";
import Link from "next/link";
import DeleteModal from "@/components/DeleteModal";

export default function Page() {
    //Get current logged in user details
    const { user, updateUser } = useUser();

    const router = useRouter();

    //Allow user to show delete account confirmation dialog modal if user clicks on 
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const openDeleteModal = () => setShowDeleteAccount(true);
    const closeDeleteModal = () => setShowDeleteAccount(false);
    const deleteMessage = 'Are you sure you want to delete your account? This will remove you from all groups and delete all events created by you.'

    //Allow login directly on account page if user isn't authenticated
    const [loginForm, setLoginForm] = useState({username: '', password: ''});
    const handleLogin = useLogin(loginForm, '/account');

     //Delete currently logged in user from database and return user to home page
     const handleDeleteAccount = async (e) => {
        e.preventDefault();
        const res = await deleteUser({ username: user.username });
        if (res.message) {
            updateUser(null);
            closeDeleteModal();
            router.push('/');
        } else {
            alert(res.error);
        }
    }

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
                        { showDeleteAccount && <DeleteModal closeDelete={closeDeleteModal} handleDelete={handleDeleteAccount} deleteMessage={deleteMessage} /> }
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