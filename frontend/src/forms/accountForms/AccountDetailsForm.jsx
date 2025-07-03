export default function AccountDetailsForm ({registerAccount, submitFunc, setFormFunc, form}) {
    return (
        <form onSubmit={submitFunc}>
            <label htmlFor="account-name">Name:</label>
            <input type="text" id="account-name" name="account-name" onChange={(e) => setFormFunc({...form, username: e.target.value})} required autoFocus />

            <label htmlFor="account-birthday">Birthday:</label>
            <input type="date" id="account-birthday" name="account-birthday" onChange={(e) => setFormFunc({...form, birthdate: e.target.value})} required />

            <label htmlFor="default-view">Default Calendar View</label>
            <select id="default-view" name="default-view" size="3" onChange={(e) => setFormFunc({...form, defaultview: e.target.value.toLowerCase()})} required>
                <option value="year">Year</option>
                <option value="month">Month</option>
                <option value="week">Week</option>
            </select>

            <fieldset id="account-recovery" name="Account Recovery">
                <label htmlFor="recovery-question">Recovery Question:</label>
                <input type="text" id="recovery-question" name="recovery-question" placeholder="Enter a password recovery question" onChange={(e) => setFormFunc({...form, recquestion: e.target.value})} required />

                <label htmlFor="recovery-answer">Recovery Question Answer:</label>
                <input type="text" id="recovery-answer" name="recovery-answer" placeholder="Enter the answer for your recovery question" onChange={(e) => setFormFunc({...form, recanswer: e.target.value})} required />
            </fieldset>

            {
                registerAccount ? (
                    <fieldset id="set-password" name="Set Password">
                        <label htmlFor="create-password">Create Password:</label>
                        <input type="password" id="create-password" name="create-password" required />

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