export default function AccountDetailsForm ({registerAccount, submitFunc, setFormFunc, form}) {
    return (
        <form onSubmit={submitFunc}>
            <fieldset>
                <legend>User Details</legend>
                <label htmlFor="account-name">Create Username:</label>
                <input type="text" id="account-name" name="account-name" onChange={(e) => setFormFunc({...form, username: e.target.value})} required autoFocus />
                <br />
                <label htmlFor="first-name">First Name:</label>
                <input type="text" id="first-name" name="first-name" onChange={(e) => setFormFunc({...form, firstname: e.target.value})} required />
                <br />
                <label htmlFor="account-birthday">Birthday:</label>
                <input type="date" id="account-birthday" name="account-birthday" onChange={(e) => setFormFunc({...form, birthdate: e.target.value})} required />
                <br />
                <label htmlFor="default-view">Default Calendar View:</label>
                <select id="default-view" name="default-view" size="1" onChange={(e) => setFormFunc({...form, defaultview: e.target.value.toLowerCase()})} required>
                    <option value="year">Year</option>
                    <option value="month">Month</option>
                    <option value="week">Week</option>
                </select>
                <br />
                <label htmlFor="user-theme">Theme:</label>
                <input type="text" id="user-theme" name="user-theme" value='default' required disabled />
            </fieldset>

            <fieldset id="account-recovery" name="Account Recovery">
                <legend>Account Recovery</legend>
                <label htmlFor="recovery-question">Recovery Question:</label>
                <input type="text" id="recovery-question" name="recovery-question" placeholder="Enter a password recovery question" onChange={(e) => setFormFunc({...form, recquestion: e.target.value})} required />
                <br />
                <label htmlFor="recovery-answer">Recovery Question Answer:</label>
                <input type="text" id="recovery-answer" name="recovery-answer" placeholder="Enter the answer for your recovery question" onChange={(e) => setFormFunc({...form, recanswer: e.target.value})} required />
            </fieldset>

            {
                registerAccount ? (
                    <fieldset id="set-password" name="Set Password">
                        <legend>Password</legend>
                        <label htmlFor="create-password">Create Password:</label>
                        <input type="password" id="create-password" name="create-password" required />
                        <br />
                        <label htmlFor="confirm-password">Confirm Password:</label>
                        <input type="password" id="confirm-password" name="confirm-password" onChange={(e) => setFormFunc({...form, password: e.target.value})} required />
                    </fieldset>
                ) : (
                    <button type="button" id="change-password">Change Password</button>
                )
            }
            <button type="submit">Create Account</button>
        </form>
    )
}