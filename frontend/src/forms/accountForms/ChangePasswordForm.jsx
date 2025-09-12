"use client"
import { useMemo, useState } from 'react';
import sharedStyles from '../../styles/shared.module.css';
import styles from '@/styles/forms.module.css';
import theme from '@/styles/theme.module.css';
import { getAccountRecovery } from '@/utils/authenticate';
import { changePassword } from '@/utils/editUser';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';

export default function ChangePasswordForm({}) {
    const router = useRouter();
    const { user } = useUser();
    const userTheme = user?.theme || 'green';
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
    })

    //Disable username field after submitting so username is not changed when submitting new passowrd
    const [usernameDisabled, setUsernameDisabled] = useState(false);

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
            setUsernameDisabled(true);
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

    const isValid = useMemo (() => {
        return (
            fieldValues.recoveryAnswer !== '' &&
            fieldValues.createPassword !== '' &&
            fieldValues.confirmPassword !== '' &&
            fieldValues.createPassword === fieldValues.confirmPassword
        );
    }, [fieldValues.recoveryAnswer, fieldValues.createPassword, fieldValues.confirmPassword])

    return (
        <div>
            <h3 className={sharedStyles.sectionheading}>Change Password</h3>
            <form onSubmit={handleSubmit}>
                {/* User must enter their username first, to check if it is found in the DB and get recovery question */}
                <fieldset className={`${styles.fieldset} ${theme[`fldst${userTheme}`]}`}>
                    <legend><h4 className={styles.legendHeading}>Account Reset</h4></legend>
                    <div className={sharedStyles.colflex}>
                        <label className={styles.inputLabel} htmlFor='recover-username'>Account Username *</label>
                        <input className={`${styles.formInput} ${fieldValues.recoveryUsername === '' ? styles.invalidInput : null}`} id='recover-username' type='text' placeholder='Enter your username to reset password' value={fieldValues.recoveryUsername} onChange={(e) => setFieldValues({...fieldValues, recoveryUsername: e.target.value })} autoFocus disabled={usernameDisabled}/>
                        <p className={fieldValues.recoveryUsername === '' ? styles.invalidMessage : styles.validMessage}><em>Username is required</em></p>
                    </div>

                    <button className={`${usernameDisabled && styles.validMessage} ${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`} onClick={fetchUserRecovery} disabled={fieldValues.recoveryUsername === ''}>Check Username</button>
                </fieldset>
                {
                    //If the username was found in DB, display recovery question and input to type answer
                    accountDetails.username && (
                        <>
                            <fieldset className={`${styles.fieldset} ${theme[`fldst${user.theme}`]}`}>
                                <legend><h4 className={styles.legendHeading}>Account Recovery</h4></legend>
                                <div className={sharedStyles.colflex}>
                                    <p style={{marginBottom: '15px', marginTop: '0'}}>Recovery Question:</p> 
                                    <p style={{marginBottom: '15px', marginTop: '0'}}>{accountDetails.recoveryQuestion}</p>
                                </div>
                                <div className={sharedStyles.colflex}>
                                    <label className={styles.inputLabel} htmlFor="enter-rec-answer">Recovery Answer *</label>
                                    <input className={`${styles.formInput} ${fieldValues.recoveryAnswer === '' ? styles.invalidInput : null}`} placeholder="Enter the answer to your recovery question above" type="text" id="enter-rec-answer" name="enter-rec-answer" value={fieldValues.recoveryAnswer} onChange={(e) => setFieldValues({...fieldValues, recoveryAnswer: e.target.value })} required />
                                    <p className={`${fieldValues.recoveryAnswer === '' ? styles.invalidMessage : styles.validMessage}`}><em>Recovery question answer is required</em></p>
                                </div>
                            </fieldset>

                            <fieldset className={`${styles.fieldset} ${theme[`fldst${userTheme}`]}`}id="set-password" name="Set Password">
                                <legend><h4 className={styles.legendHeading}>Reset Password</h4></legend>

                                <div className={sharedStyles.colflex}>
                                    <label className={styles.inputLabel} htmlFor="create-password">Create Password *</label>
                                    <input className={`${styles.formInput} ${fieldValues.createPassword === '' ? styles.invalidInput : null}`} type="password" placeholder='Enter your new password' id="create-password" name="create-password" value={fieldValues.createPassword} onChange={(e) => setFieldValues({...fieldValues, createPassword: e.target.value })} required />
                                    <p className={`${fieldValues.createPassword === '' ? styles.invalidMessage : styles.validMessage}`}><em>New password is required</em></p>
                                </div>

                                <div className={sharedStyles.colflex}>
                                    <label className={styles.inputLabel} htmlFor="confirm-password">Confirm Password *</label>
                                    <input className={`${styles.formInput} ${(fieldValues.confirmPassword === '' || fieldValues.confirmPassword !== fieldValues.createPassword) ? styles.invalidInput : null}`}type="password" placeholder='Confirm your new password' id="confirm-password" name="confirm-password" value={fieldValues.confirmPassword} onChange={(e) => setFieldValues({...fieldValues, confirmPassword: e.target.value })} required />
                                    <p className={`${fieldValues.confirmPassword === '' ? styles.invalidMessage : styles.validMessage}`}><em>Confirm password is required</em></p>
                                    <p className={`${fieldValues.confirmPassword !== fieldValues.createPassword ? styles.invalidMessage : styles.validMessage}`}><em>Confirm password must match Create password</em></p>
                                </div>
                            </fieldset>

                            <Link href={'/account'}>
                                <button type='button' className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`}>Cancel</button>
                            </Link>
                            <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`} type="submit" id="change-password" disabled={!isValid}>Change Password</button>
                        </> 
                    )
                }

            </form>
        </div>
    )
}