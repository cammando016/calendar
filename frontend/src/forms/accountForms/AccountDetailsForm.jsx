'use client'
//Signup / edit account details form
import sharedStyles from '../../styles/shared.module.css';
import formStyles from '../../styles/forms.module.css';
import theme from '../../styles/theme.module.css';
import Link from "next/link";
import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function AccountDetailsForm ({registerAccount, submitFunc, setFormFunc, form, submitDisabled, createPassword, updatePassword, user}) {
    //const [recapPassed, setRecapPassed] = useState(false);
    //const recapref = useRef();

    // const handleRecapChange = (value) => {
    //     if (value) setRecapPassed(true);
    // }
    return (
        <div>
            {
                registerAccount ? 
                <div className={`${sharedStyles.sectionheading} ${sharedStyles.rowflex}`}>
                    <h3>Sign Up</h3>
                    <button form='account' className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${form.usertheme}`]}`} type="submit" disabled={submitDisabled}>Create Account</button>
                </div>
                :
                <div className={`${sharedStyles.sectionheading} ${sharedStyles.rowflex}`}>
                    <h3>Update Account</h3>
                </div>
            }
            <form id='account' onSubmit={submitFunc}>
                <fieldset className={`${formStyles.fieldset} ${theme[`fldst${form.usertheme}`]}`} >
                    <legend><h4 className={formStyles.legendHeading}>User Details</h4></legend>
                    {
                        registerAccount && (
                            <div className={sharedStyles.colflex}>
                                <label className={formStyles.formLabel} htmlFor="username">Create Username *</label>
                                <input className={`${formStyles.formInput} ${form.username === '' ? formStyles.invalidInput : null }`} placeholder='Create your max 10 character username' maxLength={10} type="text" id="username" name="username" value={form.username} onChange={(e) => setFormFunc({...form, username: e.target.value.toLowerCase()})} required autoFocus />
                            </div>
                        )
                    }
                    <div className={sharedStyles.colflex}>
                        <label className={formStyles.formLabel} htmlFor="first-name">First Name *</label>
                        <input className={`${formStyles.formInput} ${form.firstname === '' ? formStyles.invalidInput : null }`} placeholder={'Enter your first name'} maxLength={15} type="text" id="first-name" name="first-name" value={form.firstname} onChange={(e) => setFormFunc({...form, firstname: e.target.value})} required />
                    </div>
                    <div className={sharedStyles.colflex}>
                        <label className={formStyles.formLabel} htmlFor="account-birthday">Birthday *</label>
                        <input className={`${formStyles.formInput} ${form.birthdate === '' || new Date(form.birthdate) > new Date() ? formStyles.invalidInput : null }`} type="date" id="account-birthday" name="account-birthday" value={form.birthdate} onChange={(e) => setFormFunc({...form, birthdate: e.target.value})} required />
                    </div>
                    <div className={sharedStyles.colflex}>
                        <label className={formStyles.formLabel} htmlFor="default-view">Default Calendar View *</label>
                        <select className={`${formStyles.formInput} ${form.defaultview === '' ? formStyles.invalidInput : null }`} placeholder={'Select your default calendar view' } id="default-view" name="default-view" size="1" value={form.defaultview} onChange={(e) => setFormFunc({...form, defaultview: e.target.value.toLowerCase()})} required>
                            <option value="year">Year</option>
                            <option value="month">Month</option>
                            <option value="week">Week</option>
                        </select>
                    </div>
                    {/* User theme currently inactive, only default theme in use initially */}
                    <div className={sharedStyles.colflex}>
                        <label className={formStyles.formLabel} htmlFor="account-theme">Theme *</label>
                        <select className={`${formStyles.formInput} ${form.usertheme === '' ? formStyles.invalidInput : null }`} placeholder={'Select your colour theme' } id="account-theme" name="account-theme" size="1" value={form.usertheme} onChange={(e) => setFormFunc({...form, usertheme: e.target.value.toLowerCase()})} required>
                            <option value='blue'>Blue</option>
                            <option value='green'>Green</option>
                            <option value='orange'>Orange</option>
                            <option value='purple'>Purple</option>
                            <option value='red'>Red</option>
                        </select>
                    </div>
                </fieldset>

                <fieldset className={`${formStyles.fieldset} ${theme[`fldst${form.usertheme}`]}`} id="account-recovery" name="Account Recovery">
                    <legend><h4 className={formStyles.legendHeading}>Account Recovery</h4></legend>
                    <div className={sharedStyles.colflex}>
                        <label className={formStyles.formLabel} htmlFor="recovery-question">Recovery Question *</label>
                        <input className={`${formStyles.formInput} ${form.recquestion === '' ? formStyles.invalidInput : null }`} type="text" maxLength={100} id="recovery-question" name="recovery-question" placeholder={"Enter a password recovery question (max 100 chars)"} value={form.recquestion} onChange={(e) => setFormFunc({...form, recquestion: e.target.value})} required />
                    </div>
                    <div className={sharedStyles.colflex}>
                        <label className={formStyles.formLabel} htmlFor="recovery-answer">Recovery Question Answer *</label>
                        <input className={`${formStyles.formInput} ${form.recanswer === '' ? formStyles.invalidInput : null }`} type="text" id="recovery-answer" name="recovery-answer" placeholder={"Enter your recovery question answer (max 100 chars)"} value={form.recanswer} onChange={(e) => setFormFunc({...form, recanswer: e.target.value.toLowerCase()})} required />
                    </div>
                </fieldset>

                {
                    //Form can be reused for either edit account details or create account.
                    //Show create and confirm password fields only if it is in the create account page.
                    registerAccount ? (
                        <>
                            <fieldset className={`${formStyles.fieldset} ${theme[`fldst${form.usertheme}`]}`} id="set-password" name="Set Password">
                                <legend><h4 className={formStyles.legendHeading}>Password</h4></legend>
                                <div className={sharedStyles.colflex}>
                                    <label className={formStyles.formLabel} htmlFor="create-password">Create Password *</label>
                                    <input className={`${formStyles.formInput} ${createPassword === '' ? formStyles.invalidInput : null }`} maxLength={20} type="password" id="create-password" name="create-password" value={createPassword} onChange={(e) => updatePassword(e.target.value)} required />
                                </div>
                                <div className={sharedStyles.colflex}>
                                    <label className={formStyles.formLabel} htmlFor="confirm-password">Confirm Password *</label>
                                    <input className={`${formStyles.formInput} ${(form.password === '' || createPassword !== form.password) ? formStyles.invalidInput : null }`} maxLength={20} type="password" id="confirm-password" name="confirm-password" value={form.password} onChange={(e) => setFormFunc({...form, password: e.target.value})} required />
                                    {
                                        createPassword !== form.password && <p>Confirm Password does not match Create Password.</p>
                                    }
                                </div>
                            </fieldset>
                        </>
                    ) : (
                        <div className={`${sharedStyles.rowflex}`} id='edit-account-form-buttons'>
                            <Link key='cancel-account-update' href='/account'>
                                <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${form.usertheme}`]}`} type='button'>Cancel Changes</button>
                            </Link>
                            <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${form.usertheme}`]}`} type="submit" disabled={submitDisabled}>Update Account</button>
                        </div>
                    )
                }
            </form>
        </div>
    )
}