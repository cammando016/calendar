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

import sharedStyles from '@/styles/shared.module.css';
import theme from '@/styles/theme.module.css';

export default function Page() {
    //Get current logged in user details
    const { user, updateUser } = useUser();
    const userTheme = user?.theme || 'green';
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
        <div>
            <h3 className={sharedStyles.sectionheading}>My Account</h3>
            {
                //Check if a user is authenticated to render relevant page content
                user !== null ? (
                    //Display user account details if authenticated
                    <div id="acc-details-auth">
                        <div style={{paddingLeft: '5px'}} id="account-details">
                            <h4 style={{marginBottom: '0'}}>First Name</h4> <p style={{marginTop: '10px'}}>{user.firstname}</p>
                            <h4 style={{marginBottom: '0'}}>Username</h4> <p style={{marginTop: '10px'}}>{user.username}</p>
                            <h4 style={{marginBottom: '0'}}>Birthday</h4> <p style={{marginTop: '10px'}}>{user.birthdate}</p>
                            <h4 style={{marginBottom: '0'}}>Default View</h4> <p style={{marginTop: '10px'}}>{user.defaultView}</p>
                            <h4 style={{marginBottom: '0'}}>Theme</h4> <p style={{marginTop: '10px'}}>{user.theme}</p>
                            <h4 style={{marginBottom: '0'}}>Recovery Question</h4> <p style={{marginTop: '10px'}}>{user.recoveryQuestion}</p>
                        </div>

                        <div className={sharedStyles.rowflex} style={{justifyContent: 'center'}} id="account-updaters">
                            <Link key='change-password-button' href='/account/reset-password'>
                                <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`} type="button">Change Password</button>
                            </Link>
                            <Link key='edit-account-button' href='/account/edit' >
                                <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`} type="button">Edit Account</button>
                            </Link>
                            <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`} type="button" onClick={openDeleteModal}>Delete Account</button>
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
        </div>
    )
}