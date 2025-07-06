import sharedStyles from '../../styles/shared.module.css';
import formStyles from '../../styles/forms.module.css'

export default function AccountDetailsForm ({registerAccount, submitFunc, setFormFunc, form, submitDisabled, createPassword, updatePassword}) {
    return (
        <form onSubmit={submitFunc}>
            <fieldset>
                <legend>User Details</legend>
                <div className={sharedStyles.colflex}>
                    <label htmlFor="username">* Create Username</label>
                    <input className={`${formStyles.formInput} ${form.username === '' ? formStyles.invalidInput : formStyles.validInput }`} type="text" id="username" name="username" value={form.username} onChange={(e) => setFormFunc({...form, username: e.target.value})} required autoFocus />
                </div>
                <div className={sharedStyles.colflex}>
                    <label htmlFor="first-name">* First Name</label>
                    <input className={`${formStyles.formInput} ${form.firstname === '' ? formStyles.invalidInput : formStyles.validInput }`} type="text" id="first-name" name="first-name" value={form.firstname} onChange={(e) => setFormFunc({...form, firstname: e.target.value})} required />
                </div>
                <div className={sharedStyles.colflex}>
                    <label htmlFor="account-birthday">* Birthday</label>
                    <input className={`${formStyles.formInput} ${form.birthdate === '' ? formStyles.invalidInput : formStyles.validInput }`} type="date" id="account-birthday" name="account-birthday" value={form.birthdate} onChange={(e) => setFormFunc({...form, birthdate: e.target.value})} required />
                </div>
                <div className={sharedStyles.colflex}>
                    <label htmlFor="default-view">* Default Calendar View</label>
                    <select className={`${formStyles.formInput} ${form.defaultview === '' ? formStyles.invalidInput : formStyles.validInput }`} id="default-view" name="default-view" size="1" value={form.defaultview} onChange={(e) => setFormFunc({...form, defaultview: e.target.value.toLowerCase()})} required>
                        <option value="year">Year</option>
                        <option value="month">Month</option>
                        <option value="week">Week</option>
                    </select>
                </div>
                <div className={sharedStyles.colflex}>
                    <label htmlFor="account-theme">* Theme</label>
                    <input className={`${formStyles.formInput} ${form.usertheme === '' ? formStyles.invalidInput : formStyles.validInput }`} type="text" id="account-theme" name="account-theme" value={form.usertheme} required disabled />
                </div>
            </fieldset>

            <fieldset id="account-recovery" name="Account Recovery">
                <legend>Account Recovery</legend>
                <div className={sharedStyles.colflex}>
                    <label htmlFor="recovery-question">* Recovery Question:</label>
                    <input className={`${formStyles.formInput} ${form.recquestion === '' ? formStyles.invalidInput : formStyles.validInput }`} type="text" id="recovery-question" name="recovery-question" placeholder="Enter a password recovery question" value={form.recquestion} onChange={(e) => setFormFunc({...form, recquestion: e.target.value})} required />
                </div>
                <div className={sharedStyles.colflex}>
                    <label htmlFor="recovery-answer">* Recovery Question Answer:</label>
                    <input className={`${formStyles.formInput} ${form.recanswer === '' ? formStyles.invalidInput : formStyles.validInput }`} type="text" id="recovery-answer" name="recovery-answer" placeholder="Enter the answer for your recovery question" value={form.recanswer} onChange={(e) => setFormFunc({...form, recanswer: e.target.value})} required />
                </div>
            </fieldset>

            {
                registerAccount ? (
                    <fieldset id="set-password" name="Set Password">
                        <legend>Password</legend>
                        <div className={sharedStyles.colflex}>
                            <label htmlFor="create-password">* Create Password:</label>
                            <input className={`${formStyles.formInput} ${createPassword === '' ? formStyles.invalidInput : formStyles.validInput }`} type="password" id="create-password" name="create-password" value={createPassword} onChange={(e) => updatePassword(e.target.value)} required />
                        </div>
                        <div className={sharedStyles.colflex}>
                            <label htmlFor="confirm-password">* Confirm Password:</label>
                            <input className={`${formStyles.formInput} ${(form.password === '' || createPassword !== form.password) ? formStyles.invalidInput : formStyles.validInput }`} type="password" id="confirm-password" name="confirm-password" value={form.password} onChange={(e) => setFormFunc({...form, password: e.target.value})} required />
                            {
                                createPassword !== form.password && <p>Confirm Password does not match Create Password.</p>
                            }
                        </div>
                    </fieldset>
                ) : (
                    <button type="button" id="change-password">Change Password</button>
                )
            }

            <button type="submit" disabled={submitDisabled}>Create Account</button>
        </form>
    )
}