"use client"
import { useState } from 'react';
import sharedStyles from '../../styles/shared.module.css';
import { getAccountRecovery } from '@/utils/authenticate';
import { changePassword } from '@/utils/editUser';
import { useRouter } from 'next/navigation';

export default function ChangePasswordForm({}) {
    const router = useRouter();
    //Store and update state of user entry into account recovery fields
    const [fieldValues, setFieldValues] = useState({
        recoveryUsername: '',
        recoveryAnswer: '',
        createPassword: '',
        confirmPassword: ''
    });
    //Store user details in state if username is verified to exist in DB
    const [accountDetails, setAccountDetails] = useState({
        username: null,
        recoveryQuestion: null,
        recoveryAnswer: null,
    })

    //Check with the DB if the submitted username exists.
    //Add username and recovery question/answer into accountDetails state to validate password reset
    const fetchUserRecovery = async (e) => {
        e.preventDefault();
        const res = await getAccountRecovery(fieldValues.recoveryUsername)
        if (res.message) {
            setAccountDetails({
                username: res.recoveryDetails.username,
                recoveryQuestion: res.recoveryDetails.recoveryQuestion
            });
            setFieldValues(prev => ({ ...prev, username: res.recoveryDetails.username }));
        } else {
            alert(res.error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fieldValues.createPassword !== fieldValues.confirmPassword) {
            alert('Create password does not match confirm password');
            return;
        }
        const res = await changePassword({
            username: fieldValues.username,
            recoveryAnswer: fieldValues.recoveryAnswer,
            newPassword: fieldValues.createPassword
        });
        if (res.message) {
            alert('Password changed successfully, redirecting to login...');
            router.push('/login');
        } else {
            alert(res.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* User must enter their username first, to check if it is found in the DB and get recovery question */}
            <fieldset>
                <legend>Account Reset</legend>
                <div className={sharedStyles.colflex}>
                    <label htmlFor='recover-username'>Account Username: </label>
                    <input id='recover-username' type='text' placeholder='Enter the username of the account to reset password for' value={fieldValues.recoveryUsername} onChange={(e) => setFieldValues({...fieldValues, recoveryUsername: e.target.value })} autoFocus />
                </div>

                <button onClick={fetchUserRecovery}>Check Username</button>
            </fieldset>
            {
                //If the username was found in DB, display recovery question and input to type answer
                accountDetails.username && (
                    <>
                        <fieldset>
                            <legend>Account Recovery</legend>
                            <p>Recovery Question: {accountDetails.recoveryQuestion}</p>
                            <div className={sharedStyles.colflex}>
                                <label htmlFor="enter-rec-answer">Recovery Answer: </label>
                                <input placeholder="Enter the answer to your recovery question above" type="text" id="enter-rec-answer" name="enter-rec-answer" value={fieldValues.recoveryAnswer} onChange={(e) => setFieldValues({...fieldValues, recoveryAnswer: e.target.value })} required />
                            </div>
                        </fieldset>

                        <fieldset id="set-password" name="Set Password">
                            <legend>Reset Password</legend>

                            <div className={sharedStyles.colflex}>
                                <label htmlFor="create-password">Create Password: </label>
                                <input type="password" placeholder='Enter your new password' id="create-password" name="create-password" value={fieldValues.createPassword} onChange={(e) => setFieldValues({...fieldValues, createPassword: e.target.value })} required />
                            </div>

                            <div className={sharedStyles.colflex}>
                                <label htmlFor="confirm-password">Confirm Password: </label>
                                <input type="password" placeholder='Confirm your new password' id="confirm-password" name="confirm-password" value={fieldValues.confirmPassword} onChange={(e) => setFieldValues({...fieldValues, confirmPassword: e.target.value })} required />
                            </div>
                        </fieldset>

                        {
                            //If create password field is empty, hide change password button and prompt user
                            //If create password field isn't empty, confirm password field must match to reveal change password button, otherwise prompt user
                            fieldValues.createPassword === '' ? (
                                <p>Please enter your new password</p>
                            ) : fieldValues.createPassword !== fieldValues.confirmPassword ? (
                                <p>Confirm password must match create password</p>
                            ) : (
                                <button type="submit" id="change-password">Change Password</button>
                            )
                        }
                    </> 
                )
            }
        </form>
    )
}