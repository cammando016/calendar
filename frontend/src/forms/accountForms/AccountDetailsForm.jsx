export default function AccountDetailsForm ({registerAccount}) {
    <form>
        <label htmlFor="account-name">Name:</label>
        <input type="text" id="account-name" name="account-name" required autoFocus />

        <label htmlFor="account-birthday">Birthday:</label>
        <input type="date" id="account-birthday" name="account-birthday" required />

        <label htmlFor="default-view">Default Calendar View</label>
        <select id="default-view" name="default-view" size="3" required>
            <option value="year">Year</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
        </select>

        <fieldset id="account-recovery" name="Account Recovery">
            <label htmlFor="recovery-question">Recovery Question:</label>
            <input type="text" id="recover-question" name="recovery-question" placeholder="Enter a password recovery question" required />

            <label htmlFor="recovery-answer">Recovery Question Answer:</label>
            <input type="text" id="recovery-answer" name="recovery-answer" placeholder="Enter the answer for your recovery question" required />
        </fieldset>

        {
            registerAccount ? (
                <fieldset id="set-password" name="Set Password">
                    <label htmlFor="create-password">Create Password:</label>
                    <input type="text" id="create-password" name="create-password" required />

                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="text" id="confirm-password" name="confirm-password" required />
                </fieldset>
            ) : (
                <button type="button" id="change-password">Change Password</button>
            )
        }
        <button type="submit">Create Account</button>
    </form>
}